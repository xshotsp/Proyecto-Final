const { User, Product, UserProduct } = require("../db");

const userProductController = {
  async createRelation({ email, products }) {
    try {
      // Verificar si el usuario existe
      const user = await User.findByPk(email);

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      // Convertir a array si solo se proporciona un producto
      const productsArray = Array.isArray(products) ? products : [products];

      // Obtener la lista de IDs de productos
      const productIds = productsArray.map((product) => product.productId);

      // Obtener la lista de productos existentes en la base de datos
      const existingCartItems = await UserProduct.findAll({
        where: {
          userEmail: email,
          productId: productIds,
        },
      });

      const existingCartItemsMap = existingCartItems.reduce((map, item) => {
        map[item.productId] = item;
        return map;
      }, {});

      // Iterar sobre la lista de productos proporcionada
      for (const { productId, quantity } of productsArray) {
        // Verificar si el producto ya existe en el carrito del usuario
        const existingCartItem = existingCartItemsMap[productId];

        if (existingCartItem) {
          // Si ya existe, puedes actualizar la cantidad o manejarlo según tus necesidades
          existingCartItem.quantity += quantity;
          await existingCartItem.save();
        } else {
          // Crear el carrito item y asociarlo al usuario y al producto
          await UserProduct.create({
            quantity,
            userEmail: email,
            productId: productId,
          });
        }
      }

      return "Relaciones creadas exitosamente";
    } catch (error) {
      return error.message;
    }
  },

  // Actualizar la cantidad en una relación usuario-producto

  async updateRelation({ email, productId, quantity }) {
    try {
      // Verificar si la relación existe
      const relation = await UserProduct.findOne({
        where: {
          userEmail: email,
          productId: productId,
        },
      });

      if (!relation) {
        throw new Error("La relación no existe.");
      }

      // Actualizar la cantidad
      if (relation.quantity === 1 && !quantity) {
        await relation.destroy();
      } else if (quantity) {
        relation.quantity = quantity;
        await relation.save();
      } else {
        relation.quantity -= 1;
        await relation.save();
      }

      return relation;
    } catch (error) {
      return error.message;
    }
  },

  // Eliminar una relación usuario-producto
  async deleteRelation({ email }) {
    try {
      const result = await UserProduct.destroy({ where: { userEmail: email } });

      if (result === 0) {
        throw new Error(
          "No se encontraron relaciones usuario-producto para eliminar"
        );
      }

      return "Carrito borrado.";
    } catch (error) {
      console.error(
        "Error al eliminar las relaciones usuario-producto:",
        error
      );
      throw new Error("Error interno del servidor");
    }
  },
  async getAllProductsUser({ email }) {
    try {
      const user = await User.findOne({
        where: { email: email },
        include: "products"
      });

      if (user === 0) {
        throw new Error("El usuario no tiene productos en su carrito.");
      }

      return user;
    } catch (error) {
      console.error(
        "Error al eliminar las relaciones usuario-producto:",
        error
      );
      throw new Error("Error interno del servidor");
    }
  },
};

module.exports = userProductController;
