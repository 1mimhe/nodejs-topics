/*
One-To-One:
    A.hasOne(B) => Foreign key is in B.
    A.belongsTo(B) => Foreign key is in A.
    *** Associations are defined in pairs. => the 'hasOne' and 'belongsTo' associations are used together.

One-To-Many:
    A.hasMany(B) => Foreign key is in B.
    B.belongsTo(A)
    *** The 'hasMany' and 'belongsTo' associations are used together.

*** These three calls will cause Sequelize to automatically add foreign keys
    to the appropriate models (unless they are already present).    

Many-To-Many:
    A.belongsToMany(B, { through: 'C' }) => table C as junction table.
    *** Two belongsToMany calls are used together.
    *** Sequelize will automatically create this model C (unless it already exists)
    and define the appropriate foreign keys on it.
*/