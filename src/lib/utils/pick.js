export const pick = (obj, props) => {
  const result = {};
  props.forEach(name => (result[name] = obj[name]));
  return result;
};
