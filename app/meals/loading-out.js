import classes from "./loading.module.css";

//To make this granular we have moved it into page

export default function MealsLoadingPage() {
  return <p className={classes.loading}>Fetching meals...</p>;
}
