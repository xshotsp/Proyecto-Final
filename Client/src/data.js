export const getComments = async () => {
  return [
    {
      id: "1",
      body: "exelente me encantaron",
      rating:5,
      username: "Jack",
      userId: "1",
      parentId: null,
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
    {
      id: "2",
      body: "Voy a comprame otros dos ",
      username: "John",
      rating:3,
      userId: "2",
      parentId: null,
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
    {
      id: "3",
      body: "Muchas gracias por su compra",
      username: "Marcos",
      rating:2,
      userId: "2",
      parentId: "1",
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
    {
      id: "4",
      body: "me alegra que le haya encancado",
      username: "Marcos",
      rating:5,
      userId: "2",
      parentId: "2",
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
  ];
};

export const createComment = async (text, parentId = null, rating) => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    body: text,
    parentId,
    userId: "1",
    username: "John",
    rating: rating !== undefined ? rating : 0,
    createdAt: new Date().toISOString(),
  };
};


export const updateComment = async (comment, text, rating) => {
  return {
    ...comment, // Mantener las propiedades existentes del comentario
    body: text !== undefined ? text : comment.body,
    rating: rating !== undefined ? rating : comment.rating,
  };
};


export const deleteComment = async () => {
  return {};
};