37.1.11 - BizTime Exercise

Step 0: Setup
    1. In Ubuntu-shell, navigated to 37.1.11-Working Copy Folder
    2. While in Ubuntu-shell, desired folder, used the following command:
        npm init
    3. When through the wizard prompts until it was finished.
    4. While in Ubuntu-shell, desired folder, used the following command:
        git init
        touch .gitignore
        code .gitignore
    5. In VS Code because it opened from command in Line #4, added the following to the .gitignore file:
        node_modules/
    6. While in Ubuntu-shell, desired folder, used the following command:
        npm install express
        npm install pg
        git add .
        git status
        git commit -m "Initial Code from USF-Starter Code"
        git branch -M main
        git remote add origin https://github.com/SharonBeth/USF_Unit-37.1.11_Node_Biztime.git
        git git push -u origin main
        sudo service postgresql start
        createdb biztime
        psql
        \c
        \l
        psql<data.sql

    7. While trying to run the code after initial set up, I was trying to establish connection to the database. I continued to get this error:
        /home/sharonfahler/usf/Unit-37_Node-pg-Intermediate/37.1_Express-Pg-Intro/VideoCode/pg-intro/node_modules/pg/lib/crypto/sasl.js:24
        throw new Error('SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string')

        I do understand that this means something is wrong with the password, but I didn't think we had to have a password just totalk to the database. 

        I looked up several sites to investigate:
            A. https://node-postgres.com/features/connecting#environment-variables
                i. Enviornmental Variables
                        Not much new info here
                ii. Connection URI
                        Perhaps the connectionString: 'postgresql:///userdb'   is not correct, but instead should be 
                            'connectionString': SetVariable
                            This did not work.
                        Next attempt: connectionString: setVariable
                            let db = new Client({
                            connectionString: DB_URI,
                            });

            B. https://stackoverflow.com/questions/67176603/connections-to-postgres-database-failure
                i. There was a suggestion to test console.log (process.env.DB_PASSWORD)
                    I tried this, the console.log came back with my correct assignment of the variable, but it still is giving the same error.
                ii. I then tried to put it in the Client Class:
                        new Client ({
                            password: process.env.DB_PASSWORD,
                        })
                        Still didn't work
                iii.

            c. https://github.com/brianc/node-postgres/tree/master/packages/pg-connection-string
                i. Connection Strings:
                    postgres://<user>:<password>@<host>:<port>/<database>?<query>
                    postgres://sharonfahler:testing@localhost:3000/usersdb


Previous Error for client password must be a string:

         node server.js
        string1
        string1
        string1
        Server started on 3000
        /home/sharonfahler/usf/Unit-37_Node-pg-Intermediate/37.1_Express-Pg-Intro/VideoCode/pg-intro/node_modules/pg/lib/crypto/sasl.js:24
            throw new Error('SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string')
                  ^

        Error: SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string
            at Object.continueSession (/home/sharonfahler/usf/Unit-37_Node-pg-Intermediate/37.1_Express-Pg-Intro/VideoCode/pg-intro/node_modules/       pg/lib/crypto/sasl.js:24:11)
            at Client._handleAuthSASLContinue (/home/sharonfahler/usf/Unit-37_Node-pg-Intermediate/37.1_Express-Pg-Intro/VideoCode/pg-intro/        node_modules/pg/lib/client.js:272:18)
            at Connection.emit (node:events:513:28)
            at /home/sharonfahler/usf/Unit-37_Node-pg-Intermediate/37.1_Express-Pg-Intro/VideoCode/pg-intro/node_modules/pg/lib/connection.     js:117:12
            at Parser.parse (/home/sharonfahler/usf/Unit-37_Node-pg-Intermediate/37.1_Express-Pg-Intro/VideoCode/pg-intro/node_modules/pg-protocol/     dist/parser.js:40:17)
            at Socket.<anonymous> (/home/sharonfahler/usf/Unit-37_Node-pg-Intermediate/37.1_Express-Pg-Intro/VideoCode/pg-intro/node_modules/       pg-protocol/dist/index.js:11:42)
            at Socket.emit (node:events:513:28)
            at addChunk (node:internal/streams/readable:324:12)
            at readableAddChunk (node:internal/streams/readable:297:9)
            at Readable.push (node:internal/streams/readable:234:10)

After making changes to set up from YouTube video, the follow Errors were posted:

            sharonfahler@DESKTOP-9R9UPU2:~/usf/Unit-37_Node-pg-Intermediate/37.1_Express-Pg-Intro/VideoCode/pg-intro$ node db.js
            /home/sharonfahler/usf/Unit-37_Node-pg-Intermediate/37.1_Express-Pg-Intro/VideoCode/pg-intro/node_modules/pg-protocol/dist/parser.js:287
                    const message = name === 'notice' ? new messages_1.NoticeMessage(length, messageValue) : new messages_1.DatabaseError           (messageValue, length, name);
                                                                                                             ^

            error: password authentication failed for user "postgres"
                at Parser.parseErrorMessage (/home/sharonfahler/usf/Unit-37_Node-pg-Intermediate/37.1_Express-Pg-Intro/VideoCode/pg-intro/node_modules/         pg-protocol/dist/parser.js:287:98)
                at Parser.handlePacket (/home/sharonfahler/usf/Unit-37_Node-pg-Intermediate/37.1_Express-Pg-Intro/VideoCode/pg-intro/node_modules/          pg-protocol/dist/parser.js:126:29)
                at Parser.parse (/home/sharonfahler/usf/Unit-37_Node-pg-Intermediate/37.1_Express-Pg-Intro/VideoCode/pg-intro/node_modules/pg-protocol/         dist/parser.js:39:38)
                at Socket.<anonymous> (/home/sharonfahler/usf/Unit-37_Node-pg-Intermediate/37.1_Express-Pg-Intro/VideoCode/pg-intro/node_modules/           pg-protocol/dist/index.js:11:42)
                at Socket.emit (node:events:513:28)
                at addChunk (node:internal/streams/readable:324:12)
                at readableAddChunk (node:internal/streams/readable:297:9)
                at Readable.push (node:internal/streams/readable:234:10)
                at TCP.onStreamRead (node:internal/stream_base_commons:190:23) {
              length: 104,
              severity: 'FATAL',
              code: '28P01',
              detail: undefined,
              hint: undefined,
              position: undefined,
              internalPosition: undefined,
              internalQuery: undefined,
              where: undefined,
              schema: undefined,
              table: undefined,
              column: undefined,
              dataType: undefined,
              constraint: undefined,
              file: 'auth.c',
              line: '335',
              routine: 'auth_failed'
}


Slack Channel, TA suggested the following:

Which i think means that I need to make a user just for htis project, so there is a user name, specifically in PostgreSQL, that has a password associated with it. This is just like everything else, there are a million passwords for things, and this is one that you need at the postgreSQL (server??) so that when Node.JS calls to postgreSQL Server, they can confirm that there is user and password.

The websites I used to follow the directions to get hte code below in Ubuntu to execute: 

https://www.makeuseof.com/install-configure-postgresql-on-ubuntu/ 

& 

https://www.geeksforgeeks.org/postgresql-alter-role/


sharonfahler@DESKTOP-9R9UPU2:~$ ls /etc/postgresql/12/main/
ls: cannot access '/etc/postgresql/12/main/': No such file or directory
sharonfahler@DESKTOP-9R9UPU2:~$ service postgreasql status
postgreasql: unrecognized service
sharonfahler@DESKTOP-9R9UPU2:~$ service postgresql status
14/main (port 5432): online
sharonfahler@DESKTOP-9R9UPU2:~$ sudo -u postgresql psql
sudo: unknown user postgresql
sudo: error initializing audit plugin sudoers_audit
sharonfahler@DESKTOP-9R9UPU2:~$ ALTER USER postgresql PASSWORD 'newpassword';
ALTER: command not found
sharonfahler@DESKTOP-9R9UPU2:~$ sudo -u sharonfahler psql
psql (14.7 (Ubuntu 14.7-0ubuntu0.22.04.1))
Type "help" for help.

sharonfahler=# ALTER USER postgres PASSWORD 'newpassword';
ALTER ROLE
sharonfahler=# psql -U postgre -h localhost
sharonfahler-# ;
ERROR:  syntax error at or near "psql"
LINE 1: psql -U postgre -h localhost
        ^
sharonfahler=# psql -U postgres -h localhost
sharonfahler-# ;
ERROR:  syntax error at or near "psql"
LINE 1: psql -U postgres -h localhost
        ^
sharonfahler=# \q
sharonfahler@DESKTOP-9R9UPU2:~$ psql
psql (14.7 (Ubuntu 14.7-0ubuntu0.22.04.1))
Type "help" for help.

sharonfahler=# \du sharonfahler
                        List of roles
  Role name   |            Attributes             | Member of
--------------+-----------------------------------+-----------
 sharonfahler | Superuser, Create role, Create DB | {}


*************************************Thsi part worked******************


I set up a user in PostgreSQL & assigned a password. Then, I entered that user & password into my code in db.js file so they could talk to each other. This is similar to github and my computer when initially set up, they have to know that each one is talking to the correct file and that it is authorized. I put the step-by-step procedure in my master excel file in Shortcut Keys.


             sharonfahler@DESKTOP-9R9UPU2:~/usf/Unit-37_Node-pg-Intermediate/37.1_Express-Pg-Intro/VideoCode/pg-intro$ psql
            psql (14.7 (Ubuntu 14.7-0ubuntu0.22.04.1))
            Type "help" for help.

            sharonfahler=# alter role sharonfahler login password;
            ERROR:  syntax error at or near ";"
            LINE 1: alter role sharonfahler login password;
                                                          ^
            sharonfahler=# alter role sharonfahler login password;
            ERROR:  syntax error at or near ";"
            LINE 1: alter role sharonfahler login password;
                                                          ^
            sharonfahler=# alter role sharonfahler login password
            sharonfahler-# ;
            ERROR:  syntax error at or near ";"
            LINE 2: ;
                    ^
            sharonfahler=# alter role sharonfahler login password 'geeks12345';
            ALTER ROLE
            sharonfahler=# create role testing1 login password 'testingpassword';
            CREATE ROLE
            sharonfahler=# alter roll testing1 login password 'testingpassword1';
            ERROR:  syntax error at or near "roll"
            LINE 1: alter roll testing1 login password 'testingpassword1';
                          ^
            sharonfahler=# alter role testing1 login password 'testingpassword1';
            ALTER ROLE
            sharonfahler=# \du testing1
                       List of roles
             Role name | Attributes | Member of
            -----------+------------+-----------
             testing1  |            | {}

            sharonfahler=# alter role testing1 login password 'testingpassword1';
            ALTER ROLE
            sharonfahler=# alter role testing1 superuser;
            ALTER ROLE
            sharonfahler=# \du testing1
                       List of roles
             Role name | Attributes | Member of
            -----------+------------+-----------
             testing1  | Superuser  | {}

            sharonfahler=# \q


********************************************db.js   file    code:

            const { Client } = require('pg')

            const client = new Client({
              host: "localhost",
              user: "testing1",
              port: 5432,
              password: "testingpassword1",
              database: "postgres"
            })

            client.connect();

            client.query(`Select * from users`, (err, res) => {
              if (!err) {
                console.log(res.rows);
              } else {
                console.log(err.message);
              }
              client.end;
            })

module.exports = client;