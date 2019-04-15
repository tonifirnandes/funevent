-- Drop table

-- DROP TABLE public.accesstoken;

CREATE TABLE public.accesstoken (
	id text NOT NULL,
	ttl int4 NULL DEFAULT 1209600,
	scopes text NULL,
	created timestamptz NULL,
	userid int4 NULL,
	CONSTRAINT accesstoken_pkey PRIMARY KEY (id)
);

-- Drop table

-- DROP TABLE public.acl;

CREATE TABLE public.acl (
	model text NULL,
	property text NULL,
	accesstype text NULL,
	"permission" text NULL,
	principaltype text NULL,
	principalid text NULL,
	id serial NOT NULL,
	CONSTRAINT acl_pkey PRIMARY KEY (id)
);

-- Drop table

-- DROP TABLE public."event";

CREATE TABLE public."event" (
	id serial NOT NULL,
	name text NOT NULL,
	description text NULL,
	schedule_id int4 NOT NULL,
	visitors text NULL,
	CONSTRAINT event_pkey PRIMARY KEY (id),
	CONSTRAINT event_un UNIQUE (schedule_id),
	CONSTRAINT event_schedule_fk FOREIGN KEY (schedule_id) REFERENCES schedule(id)
);

-- Drop table

-- DROP TABLE public.place;

CREATE TABLE public.place (
	id serial NOT NULL,
	name text NOT NULL,
	address text NOT NULL,
	mark text NULL,
	coordinates float8[] NULL,
	schedule_id int4 NOT NULL,
	CONSTRAINT place_pkey PRIMARY KEY (id),
	CONSTRAINT place_un UNIQUE (schedule_id),
	CONSTRAINT place_schedule_fk FOREIGN KEY (schedule_id) REFERENCES schedule(id)
);

-- Drop table

-- DROP TABLE public."role";

CREATE TABLE public."role" (
	id serial NOT NULL,
	name text NOT NULL,
	description text NULL,
	created timestamptz NULL,
	modified timestamptz NULL,
	CONSTRAINT role_pkey PRIMARY KEY (id)
);

-- Drop table

-- DROP TABLE public.rolemapping;

CREATE TABLE public.rolemapping (
	id serial NOT NULL,
	principaltype text NULL,
	principalid text NULL,
	roleid int4 NULL,
	CONSTRAINT rolemapping_pkey PRIMARY KEY (id)
);
CREATE INDEX rolemapping_principalid_idx ON public.rolemapping USING btree (principalid);

-- Drop table

-- DROP TABLE public.schedule;

CREATE TABLE public.schedule (
	id serial NOT NULL,
	"date" timestamptz NOT NULL,
	event_id int4 NOT NULL,
	place_id int4 NOT NULL,
	CONSTRAINT schedule_pkey PRIMARY KEY (id),
	CONSTRAINT schedule_un UNIQUE (event_id, place_id, date),
	CONSTRAINT schedule_un2 UNIQUE (date, event_id),
	CONSTRAINT schedule_un3 UNIQUE (date, place_id),
	CONSTRAINT schedule_un4 UNIQUE (event_id, place_id),
	CONSTRAINT schedule_event_fk FOREIGN KEY (event_id) REFERENCES event(id),
	CONSTRAINT schedule_place_fk FOREIGN KEY (place_id) REFERENCES place(id)
);

-- Drop table

-- DROP TABLE public.usermodel;

CREATE TABLE public.usermodel (
	id serial NOT NULL,
	name text NOT NULL,
	full_name text NULL,
	email text NOT NULL,
	phone text NOT NULL,
	realm text NULL,
	username text NULL,
	"password" text NOT NULL,
	emailverified bool NULL,
	verificationtoken text NULL,
	CONSTRAINT usermodel_pkey PRIMARY KEY (id)
);

-- Drop table

-- DROP TABLE public.visitor;

CREATE TABLE public.visitor (
	id serial NOT NULL,
	rating int4 NULL,
	"comment" text NULL,
	user_id int4 NOT NULL,
	schedule_id int4 NOT NULL,
	CONSTRAINT visitor_pkey PRIMARY KEY (id),
	CONSTRAINT visitor_un UNIQUE (schedule_id, user_id),
	CONSTRAINT visitor_schedule_fk FOREIGN KEY (schedule_id) REFERENCES schedule(id),
	CONSTRAINT visitor_usermodel_fk FOREIGN KEY (user_id) REFERENCES usermodel(id)
);

