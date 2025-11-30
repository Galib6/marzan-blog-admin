import { Paths } from './_paths';

const toRecursivelyTraverse = (obj: any, pathsToAdd: string[] = [], pathsToRemove: string[] = []): any[] => {
  const holdArr: any[] = [];

  function traverse(item: any) {
    if (Array.isArray(item)) {
      item.forEach((elem) => traverse(elem));
    } else if (typeof item === 'object' && item !== null) {
      for (const key in item) traverse(item[key]);
    } else if (typeof item === 'string') {
      if (!pathsToRemove.includes(item)) {
        holdArr.push(item);
      }
    }
  }

  traverse(obj);
  return [...holdArr, ...pathsToAdd];
};

export const AuthPaths = toRecursivelyTraverse(Paths.admin, [], [Paths.root]);
