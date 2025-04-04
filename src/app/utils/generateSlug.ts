export const generateSlug = (name: string) => {
  const slug = name
    .toLocaleLowerCase()
    .replace(/ /g, '-') //Replaces all spaces with -
    .replace(/[^\w-]+/g, ''); //Removes all characters that are not letters, numbers, underscores (_), or hyphens (-).
  return slug;
};
