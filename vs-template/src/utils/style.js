export function getCssPropertyValue(propertyName) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(propertyName)
      .trim();
  }