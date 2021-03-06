# My Application

The project is generated by [LoopBack](http://loopback.io).

# You Might Test This App with sample React-Native App
https://github.com/tonifirnandes/funeventapp

# This Project created for presentation purpose
https://docs.google.com/presentation/d/1LjMixORNfKwXSPMyeVnFvPcyuBYGOdMoDJBh_Jp8WSI/edit?usp=sharing

# Test The sample Models in-memory-db
1. POST /events
{
  "name": "Event A",
  "description": "Event A awesome",
  "schedule_id": 1
},
{
  "name": "Event B",
  "description": "Event B awesome",
  "schedule_id": 2
}
2. POST /places
{
  "name": "Place A",
  "address": "add Place A",
  "mark": "PA",
  "schedule_id": 1
},
{
  "name": "Place B",
  "address": "add Place B",
  "mark": "PB",
  "schedule_id": 2
}
3. POST /schedules
{
  "date": "2019-04-14T22:41:57.694Z",
  "event_id": 1,
  "place_id": 1
},
{
  "date": "2019-04-14T22:41:57.694Z",
  "event_id": 2,
  "place_id": 2
}
4. POST /users
{
  "name": "user A",
  "full_name": "user ABC",
  "email": "a@gmail.com",
  "phone": "081312341234",
  "username": "user_a",
 "password": "123"
},
{
  "name": "user B",
  "full_name": "user BBB",
  "email": "b@gmail.com",
  "phone": "081343214321",
  "username": "user_b",
 "password": "321"
}
5. POST /visitors
{
  "rating": 4,
  "comment": "event a good",
  "user_id": 1,
  "schedule_id": 1
},
{
  "rating": 4,
  "comment": "event b good",
  "user_id": 2,
  "schedule_id": 2
}
-missing model base User still exposed
-missing data still in memory, so when we restart the app all the previous data not persisted
-missing no relations between model, ex: we cannot find event by place, etc
-missing still no auth yet, meant guest still can access to all model

# -missing model base User still exposed
simply just set public false of user in model-config.json
"User": {
    "dataSource": "db",
    "public": false
  },

# -missing data still in memory
lets setup new datasource, attached our model connected to our database.
1. remove prev datasource in datasources.json (so we can still use the datasource name db, and no need ot modify our model-config.json where datasource for every model)
"db": {
    "name": "db",
    "connector": "memory"
  }
- if done we are gonna see it in the datasoruces.json file
"db": {
    "host": "localhost",
    "port": 11432,
    "url": "",
    "database": "funevent",
    "password": "",
    "name": "db",
    "user": "postgres",
    "connector": "postgresql"
  }

But, we are still missing:
- missing the table in our database, should we create the table based on model again (Yes, but we can use loopback datasource autoupdate function)

-lets do:
const MODELS = ['UserModel', 'AccessToken', 'ACL', 'RoleMapping', 'Role','Event', 
'Place', 'Schedule', 'Visitor'];

  if (MODELS && MODELS.length > 0) {
    app.dataSources.db.autoupdate(MODELS, err => {
      if (err) {
        console.error("error", err);
      }

      console.log('Models : ', MODELS, ' has been updated!');
    });
  }

# missing no relations between model, ex: we cannot find event by place, etc
- dont forget to turn off autoupdate model schema
- add relations of all model (lb relation), if the relation not working we cannot find the desired data and path in rest-api
in event.json
 "schedules": {
      "type": "belongsTo",
      "model": "Schedule",
      "foreignKey": "schedule_id"
    }
in schedule.json
 "events": {
      "type": "hasOne",
      "model": "Event",
      "foreignKey": "schedule_id"
    }
- add fk in table (if we don't add it we will not get any data relation desired)
ALTER TABLE public."event" ADD CONSTRAINT event_schedule_fk FOREIGN KEY (schedule_id) REFERENCES public.schedule(id);
ALTER TABLE public.schedule ADD CONSTRAINT schedule_event_fk FOREIGN KEY (event_id) REFERENCES public."event"(id);
- add unique key
ALTER TABLE public."event" ADD CONSTRAINT event_un UNIQUE (schedule_id);
ALTER TABLE public.place ADD CONSTRAINT place_un UNIQUE (schedule_id);

For complete reference sql, see file migration.sql

