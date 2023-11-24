/* eslint-disable react/prop-types */
import styles from "./Notification.module.css";

const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  return (
    <div
      className={
        notification.status === 200 ? styles.resolved : styles.rejected
      }
    >
      {notification.message}
    </div>
  );
};

export default Notification;
