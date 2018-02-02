function setEnumValues(enumType, values) {
  for (value of values) {
    enumType[value] = value;
  }
  Object.freeze(enumType);
}
