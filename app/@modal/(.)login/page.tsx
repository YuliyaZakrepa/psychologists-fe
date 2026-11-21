import LoginForm from "@/components/LoginForm/LoginForm";
import Modal from "@/components/Modal/Modal";
import css from "./page.module.css";

export default function Login() {
  return (
    <Modal>
      <div className={css.textContainer}>
        <h2 className={css.title}>Log In</h2>
        <p className={css.text}>
          Welcome back! Please enter your credentials to access your account and
          continue your search for a psychologist
        </p>
      </div>
      <LoginForm />
    </Modal>
  );
}
