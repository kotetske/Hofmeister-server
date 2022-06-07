const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
})

const Account = sequelize.define('account', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    num: {type: DataTypes.STRING, unique: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    balance: {type: DataTypes.DOUBLE, allowNull: false},
    creditlimit: {type: DataTypes.DOUBLE, allowNull: false},
    inArchive: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
})

const AccountType = sequelize.define('accountType', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Bank = sequelize.define('bank', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Currency = sequelize.define('currency', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Operation = sequelize.define('operation', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    destination: {type: DataTypes.BOOLEAN},
    sum: {type: DataTypes.INTEGER, allowNull: false},
    data: {type: DataTypes.TIME, allowNull: false},
    place: {type: DataTypes.STRING},
    comment: {type: DataTypes.STRING},
})

const OperationType = sequelize.define('operationType',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    level: {type: DataTypes.BOOLEAN},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    income: {type: DataTypes.BOOLEAN, allowNull: false},
    expense: {type: DataTypes.BOOLEAN, allowNull: false},
})

const Icon = sequelize.define('icon', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    url: {type: DataTypes.STRING, unique: true, allowNull: false},
})

User.hasMany(Account)
Account.belongsTo(User)

User.hasMany(Category)
Category.belongsTo(User)

AccountType.hasMany(Account)
Account.belongsTo(AccountType)

Bank.hasMany(Account)
Account.belongsTo(Bank)

Currency.hasMany(Account)
Account.belongsTo(Currency)

Icon.hasMany(Category)
Category.belongsTo(Icon)

Account.hasMany(Operation)
Operation.belongsTo(Account)

Category.hasMany(Category)
Category.belongsTo(Category)

OperationType.hasMany(Category)
Category.belongsTo(OperationType)

OperationType.hasMany(Operation)
Operation.belongsTo(OperationType)

Category.hasMany(Operation)
Operation.belongsTo(Category)

module.exports = {
    User,
    Account,
    AccountType,
    Bank,
    Currency,
    Operation,
    Category,
    OperationType,
    Icon
}