const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define(
    'user',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        email: {type: DataTypes.STRING, unique: true, allowNull: false},
        password: {type: DataTypes.STRING, allowNull: false},
    },
    {
        timestamps: false
    })

const Account = sequelize.define('account',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        num: {type: DataTypes.STRING, unique: true, allowNull: false},
        name: {type: DataTypes.STRING, allowNull: false},
        balance: {type: DataTypes.DOUBLE, allowNull: false},
        creditlimit: {type: DataTypes.DOUBLE, allowNull: false},
        inArchive: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    },
    {
        timestamps: false
    }
)

const AccountType = sequelize.define('account_type', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING, unique: true, allowNull: false},
    },
    {
        timestamps: false
    })

const Bank = sequelize.define('bank', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING, unique: true, allowNull: false},
    },
    {
        timestamps: false
    })

const Currency = sequelize.define('currency', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING, unique: true, allowNull: false},
    },
    {
        timestamps: false
    })

const Operation = sequelize.define('operation', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        destination: {type: DataTypes.BOOLEAN},
        sum: {type: DataTypes.INTEGER, allowNull: false},
        date: {type: DataTypes.DATE, allowNull: false},
        place: {type: DataTypes.STRING},
        comment: {type: DataTypes.STRING},
    },
    {
        timestamps: false
    })

const OperationType = sequelize.define('operation_type', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING, unique: true, allowNull: false},
    },
    {
        timestamps: false
    })

const Icon = sequelize.define('icon', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        url: {type: DataTypes.STRING, unique: true, allowNull: false},
    },
    {
        timestamps: false
    })

const Category = sequelize.define('category', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        level: {type: DataTypes.BOOLEAN},
        name: {type: DataTypes.STRING, unique: true, allowNull: false},
        income: {type: DataTypes.BOOLEAN, allowNull: false},
        expense: {type: DataTypes.BOOLEAN, allowNull: false},
    },
    {
        timestamps: false
    })

const CategoryOperation = sequelize.define('categories_operations', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    },
    {
        timestamps: false
    })


User.hasMany(Account, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'userId',
        allowNull: false
    }
})
Account.belongsTo(User)

User.hasMany(Category, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'userId',
        allowNull: false
    }
})
Category.belongsTo(User)

AccountType.hasMany(Account, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'typeId',
        allowNull: false
    }
})
Account.belongsTo(AccountType)

Bank.hasMany(Account, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'bankId',
        allowNull: false
    }
})
Account.belongsTo(Bank)

Currency.hasMany(Account, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'currencyId',
        allowNull: false
    }
})
Account.belongsTo(Currency)

Icon.hasMany(Category, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'iconId'
})
Category.belongsTo(Icon)

Account.hasMany(Operation, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: {
        allowNull: false
    }
})
Operation.belongsTo(Account)

Account.hasMany(Operation, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
Operation.belongsTo(Account, {
    foreignKey: {
        name: 'recipientAccountId',
        allowNull: true
    }
})

Category.hasMany(Category, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'parentId'
})
Category.belongsTo(Category)

OperationType.hasMany(Category, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'operationTypeId',
        allowNull: false
    }
})
Category.belongsTo(OperationType)

OperationType.hasMany(Operation, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'operationTypeId',
        allowNull: false
    }
})
Operation.belongsTo(OperationType)

Category.hasMany(CategoryOperation, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'categoryId',
        allowNull: false
    }
})
CategoryOperation.belongsTo(Category)

Operation.hasMany(CategoryOperation, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'operationId',
        allowNull: false
    }
})
CategoryOperation.belongsTo(Operation)



module.exports = {
    User,
    Account,
    AccountType,
    Bank,
    Currency,
    Operation,
    Category,
    OperationType,
    Icon,
    CategoryOperation
}