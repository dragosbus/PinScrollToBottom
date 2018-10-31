import { from, timer, fromEvent } from "rxjs";
import { flatMap, concatAll, takeUntil } from "rxjs/operators";

const fetchUser = async () => {
  const response = await fetch("https://randomuser.me/api/");
  const data = await response.json();

  return data.results;
};

export const clickEvent$ = (element, type) => {
  return fromEvent(element, type);
};

export const getUser = (element, type) => {
  return timer(0, 5000).pipe(
    flatMap(() => from(fetchUser())),
    concatAll(),
    takeUntil(clickEvent$(element, type))
  );
};
