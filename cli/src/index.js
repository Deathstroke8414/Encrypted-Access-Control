const yargs = require ('yargs')
const util = require ('./utilities/gen')

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
        util.generate(argv.output)
    }
})

yargs.command({
    command: 'enc',
    describe: 'To encrypt the message',
    builder:{
        message:{
            type: 'string',
            demandOption: true
        },
        path:{
            type: 'string',
            demandOption: true,
            describe:'Location where the keys are stored'
        }
    },
    handler: function(argv){
        util.encrypt(argv.message,argv.path)
    }
})


yargs.command({
    command: 'grant',
    describe: 'To grant access of a particular data to a particular person',
    builder:{
        pub:{
            type: 'string',
            demandOption: true
        },
        uid:{
            type: 'string',
            demandOption:true
        },path:{
            type: 'string',
            demandOption: true,
            describe:'Location where the keys are stored'
        }
    },
    handler: function(argv){
        util.grantAccess(argv.pub,argv.uid,argv.path)
    }
})

yargs.command({
    command: 'view',
    describe: 'To view the original message of a data by ID',
    builder:{
        uid:{
            type: 'string',
            demandOption: true
        },path:{
            type: 'string',
            demandOption: true,
            describe:'Location where the keys are stored'
        }
    },
    handler: function(argv){
        util.view(argv.uid,argv.path)
    }
})

/* yargs.command({
    command: 'list-access',
    describe: 'To get a list of all the users that have access to a specific data',
    builder:{
        uid:{
            type: 'string',
            demandOption: true
        }
    },
    handler: function(argv){
        console.log("Test")
    }
}) */

yargs.command({
    command: 'data-list',
    describe: 'To list all the data with their UIDs',
    handler: function(argv){
        util.list()
    }
})

yargs.argv