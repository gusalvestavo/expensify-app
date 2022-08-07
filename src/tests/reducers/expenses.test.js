import moment from 'moment'
import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses'

test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' })

    expect(state).toEqual([])
})

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[0].id,
    }

    const state = expensesReducer(expenses, action)

    expect(state).toEqual([expenses[1], expenses[2]])
 })

 test('should not remove expense if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1',
    }

    const state = expensesReducer(expenses, action)

    expect(state).toEqual([expenses[0], expenses[1], expenses[2]])
 })

 test('should add an expense', () => {
    const expense = {
        id: '4',
        description: 'New expense',
        note: '',
        amount: 8500,
        createdAt: moment(0).add(8, 'days'),
    }

    const action = {
        type: 'ADD_EXPENSE',
        expense
    }

    const state = expensesReducer(expenses, action)

    expect(state).toEqual([...expenses, expense])
 })

 test('should edit an expense', () => {
    const expense = {
        id: '1',
        description: 'My new title',
        note: 'My new note',
        amount: 999999,
        createdAt: moment(0).add(120, 'days'),
    }

    const action = {
        type: 'EDIT_EXPENSE',
        id: '1',
        updates: expense
    }

    const state = expensesReducer(expenses, action)

    expect(state).toEqual([expense, expenses[1], expenses[2]])
 })

 test('should edit an expense #2', () => {
    const amount = 8000

    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[0].id,
        updates: {
            amount
        }
    }

    const state = expensesReducer(expenses, action)

    expect(state[0].amount).toBe(8000)
 })

 test('should not edit expense if expense not found', () => {
    const expense = {
        id: '-1',
        description: 'My new title',
        note: 'My new note',
        amount: 999999,
        createdAt: moment(0).add(120, 'days'),
    }

    const action = {
        type: 'EDIT_EXPENSE',
        id: expense.id,
        updates: expense
    }

    const state = expensesReducer(expenses, action)

    expect(state).toEqual(expenses)
 })