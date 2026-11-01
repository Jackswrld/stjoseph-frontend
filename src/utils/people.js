// Trims person text, reduces repeated spaces and converts empty optional text to null.
export function normalizePerson(raw) {
  const nullableFields = ['bio', 'phone', 'photo', 'badge', 'role_type', 'society_code']
  const normalized = { ...raw }

  for (const [field, value] of Object.entries(normalized)) {
    if (typeof value === 'string') {
      const trimmed = value.trim().replace(/ {2,}/g, ' ')
      normalized[field] = nullableFields.includes(field) && trimmed === '' ? null : trimmed
    }
  }

  return normalized
}

// Groups people by API category without changing their order within each category.
export function groupPeople(results) {
  return results.reduce((groups, person) => {
    if (person.category === 'clergy') groups.clergy.push(person)
    if (person.category === 'official') groups.officials.push(person)
    if (person.category === 'society_leader') groups.societyLeaders.push(person)
    return groups
  }, { clergy: [], officials: [], societyLeaders: [] })
}
