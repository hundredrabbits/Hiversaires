function setEnumValues(enumType, values) {
  for (value of values) {
    enumType[value] = Symbol(value);
  }
  Object.freeze(enumType);
}
