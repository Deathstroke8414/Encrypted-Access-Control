const yargs = require ('yargs')
//const util = require ('./utilities')

yargs.command({
    command: 'gen',
    describe: 'To generate private and public key pair',
    builder:{
        output:{
            type: 'string',
            demandOption: true,
            describe:'Location where the keys are stored'
        }
    },
    handler: function(argv){

    }
})

yargs.command({
    command: 'enc',
    describe: 'To encrypt the message',
    builder:{
        secret:{
            type: 'string',
            demandOption: true
        },
        message:{
            type: 'string',
            demandOption: true
        },
        output:{
            type:'string',
            demandOption:true
        }
    },
    handler: function(argv){

    }
})

yargs.command({
    command: 'save-data',
    describe: 'To save the data on the server',
    builder:{
        data:{
            type: 'string',
            demandOption: true,
            describe:'Location of the saved data'
        }
    },
    handler: function(argv){

    }
})

yargs.command({
    command: 'grant-access',
    describe: 'To grant access of a particular data to a particular person',
    builder:{
        pub:{
            type: 'string',
            demandOption: true
        },
        uid:{
            type: 'string',
            demandOption:true
        }
    },
    handler: function(argv){

    }
})

yargs.command({
    command: 'list-access',
    describe: 'To get a list of all the users that have access to a specific data',
    builder:{
        uid:{
            type: 'string',
            demandOption: true
        }
    },
    handler: function(argv){

    }
})
yargs.command({
    command: 'data-view',
    describe: 'To view the original message of a data by ID',
    builder:{
        uid:{
            type: 'string',
            demandOption: true
        }
    },
    handler: function(argv){

    }
})

yargs.command({
    command: 'data-list',
    describe: 'To list all the data with their UIDs',
    handler: function(argv){

    }
})

yargs.argv