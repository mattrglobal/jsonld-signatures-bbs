import _ from "lodash";

const isObject = (x: any): x is object => typeof x === "object";

const isArray = (x: any): x is Array<unknown> => Array.isArray(x);

export function objectIntersection(
  a: object,
  b: object,
  alwaysInclude: Set<string> = new Set()
): object {
  const stack = [];
  stack.push(...Object.keys(a).map((k) => [k]));
  const result = {};
  while (stack.length > 0) {
    const key: any = stack.pop();
    const valueA = _.get(a, key);
    const valueB = _.get(b, key);
    if (alwaysInclude.has(key.slice(-1)[0])) {
      console.log(key);
      console.log(valueA);
      _.set(result, key, valueA);
    } else if (valueB && valueA === valueB) {
      _.set(result, key, valueA);
    } else if (isArray(valueA) && isArray(valueB)) {
      const arrayIntersection = valueB.filter((valA) =>
        valueB.some((valB) => _.isEqual(valA, valB))
      );
      _.set(result, key, arrayIntersection);
    } else if (isObject(valueA)) {
      stack.push(...Object.keys(valueA).map((k) => [...key, k]));
    }
  }
  return result;
}
