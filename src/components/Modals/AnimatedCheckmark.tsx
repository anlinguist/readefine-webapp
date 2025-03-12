import classes from './AnimatedCheckmark.module.css';

const AnimatedCheckmark = () => {
  return (
    <svg className={classes.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
      <circle className={classes.circle} cx="26" cy="26" r="25" fill="none" />
      <path className={classes.check} fill="none" d="M14 27l7 7 16-16" />
    </svg>
  );
};

export default AnimatedCheckmark;