import test from 'node:test'
import assert from 'node:assert/strict'
import { groupPeople, normalizePerson } from './people.js'

test('normalizes repeated spaces in strings', () => {
  assert.equal(normalizePerson({ name: '  Fr.  Example  Name ' }).name, 'Fr. Example Name')
})

test('converts empty optional strings to null', () => {
  const person = normalizePerson({ bio: '', phone: '  ', photo: '', badge: '', role_type: '', society_code: '' })
  assert.deepEqual(person, { bio: null, phone: null, photo: null, badge: null, role_type: null, society_code: null })
})

test('groups people by category and preserves incoming order', () => {
  const results = [
    { id: 2, category: 'official' },
    { id: 1, category: 'clergy' },
    { id: 3, category: 'official' },
    { id: 4, category: 'society_leader' },
  ]
  const groups = groupPeople(results)
  assert.deepEqual(groups.clergy.map(({ id }) => id), [1])
  assert.deepEqual(groups.officials.map(({ id }) => id), [2, 3])
  assert.deepEqual(groups.societyLeaders.map(({ id }) => id), [4])
})

test('ignores unknown categories', () => {
  assert.deepEqual(groupPeople([{ category: 'unknown' }]), { clergy: [], officials: [], societyLeaders: [] })
})
