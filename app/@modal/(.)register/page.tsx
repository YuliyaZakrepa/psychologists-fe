import RegisterForm from "@/components/RegisterForm/RegisterForm";
import Modal from "@/components/Modal/Modal";
import css from "./page.module.css";
export default function Registration() {
  return (
    <Modal>
      <div className={css.textContainer}>
        <h2 className={css.title}>Registration</h2>
        <p className={css.text}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information.
        </p>
      </div>
      <RegisterForm />
    </Modal>
  );
}
