import css from "./EmptyState.module.css";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
interface EmptyStateProps {
  onReset: () => void;
}
export default function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className={css.emptyStateWrapper} role="status">
      <h2 className={css.title}>No psychologists found</h2>
      <p className={css.text}>
        We couldn&apos;t find any psychologists that match your filter.
      </p>
      <p className={css.text}>
        Try choosing a different filter or show all specialists.
      </p>
      <div className={css.buttons}>
        <Button type="button" className={css.clearButton} onClick={onReset}>
          Clear filter
        </Button>
        <Button type="button" onClick={onReset} className={css.viewAllButton}>
          View all
        </Button>
      </div>
    </div>
  );
}
