psql <<- EOSQL
    --
    -- PostgreSQL database cluster dump
    --

    SET default_transaction_read_only = off;

    SET client_encoding = 'UTF8';
    SET standard_conforming_strings = on;

    --
    -- Roles
    --

    CREATE ROLE burhan;
    ALTER ROLE burhan WITH SUPERUSER INHERIT NOCREATEROLE CREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md5469e16de78cf7cb9e6562a0f7a9b4d3f';
    CREATE ROLE postgres;
    ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'md52a29a4f7eb0a98abca0992ca3fb555b6';






    --
    -- Database creation
    --

    CREATE DATABASE dummy WITH TEMPLATE = template0 OWNER = burhan;
    REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
    GRANT CONNECT ON DATABASE template1 TO PUBLIC;


    \connect dummy

    SET default_transaction_read_only = off;

    --
    -- PostgreSQL database dump
    --

    -- Dumped from database version 10.2 (Debian 10.2-1.pgdg90+1)
    -- Dumped by pg_dump version 10.2 (Debian 10.2-1.pgdg90+1)

    SET statement_timeout = 0;
    SET lock_timeout = 0;
    SET idle_in_transaction_session_timeout = 0;
    SET client_encoding = 'UTF8';
    SET standard_conforming_strings = on;
    SET check_function_bodies = false;
    SET client_min_messages = warning;
    SET row_security = off;

    --
    -- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
    --

    CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


    --
    -- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
    --

    COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


    SET search_path = public, pg_catalog;

    SET default_tablespace = '';

    SET default_with_oids = false;

    --
    -- Name: users; Type: TABLE; Schema: public; Owner: burhan
    --

    CREATE TABLE users (
        id integer NOT NULL,
        unique_id character varying(255),
        username character varying(255),
        password character varying(255),
        owner boolean,
        "createdAt" timestamp with time zone NOT NULL,
        "updatedAt" timestamp with time zone NOT NULL
    );


    ALTER TABLE users OWNER TO burhan;

    --
    -- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: burhan
    --

    CREATE SEQUENCE users_id_seq
        AS integer
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1;


    ALTER TABLE users_id_seq OWNER TO burhan;

    --
    -- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: burhan
    --

    ALTER SEQUENCE users_id_seq OWNED BY users.id;


    --
    -- Name: users id; Type: DEFAULT; Schema: public; Owner: burhan
    --

    ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


    --
    -- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: burhan
    --

    COPY users (id, unique_id, username, password, owner, "createdAt", "updatedAt") FROM stdin;
    32	d3a409e0-2d40-11e8-8b00-9730f8810b48	helloworld	$2a$09$SesvV8BPytNQZrHYRSQBsuDT/61FNg5mXoHDJ8265xhT3Ia94m7nO	t	2018-03-21 19:48:28.671+00	2018-03-21 19:48:28.671+00
    39	7a1f1c60-2d46-11e8-ae0a-990c0786d893	burhan	$2a$09$cARBJWm2O46W6pb6oZIOsuiVLrSNYGg82S0W7bu0RulIFfOrS7GYa	f	2018-03-21 20:28:55.463+00	2018-03-21 20:28:55.463+00
    \.


    --
    -- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: burhan
    --

    SELECT pg_catalog.setval('users_id_seq', 40, true);


    --
    -- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: burhan
    --

    ALTER TABLE ONLY users
        ADD CONSTRAINT users_pkey PRIMARY KEY (id);


    --
    -- PostgreSQL database dump complete
    --

    \connect postgres

    SET default_transaction_read_only = off;

    --
    -- PostgreSQL database dump
    --

    -- Dumped from database version 10.2 (Debian 10.2-1.pgdg90+1)
    -- Dumped by pg_dump version 10.2 (Debian 10.2-1.pgdg90+1)

    SET statement_timeout = 0;
    SET lock_timeout = 0;
    SET idle_in_transaction_session_timeout = 0;
    SET client_encoding = 'UTF8';
    SET standard_conforming_strings = on;
    SET check_function_bodies = false;
    SET client_min_messages = warning;
    SET row_security = off;

    --
    -- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
    --

    COMMENT ON DATABASE postgres IS 'default administrative connection database';


    --
    -- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
    --

    CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


    --
    -- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
    --

    COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


    --
    -- PostgreSQL database dump complete
    --

    \connect template1

    SET default_transaction_read_only = off;

    --
    -- PostgreSQL database dump
    --

    -- Dumped from database version 10.2 (Debian 10.2-1.pgdg90+1)
    -- Dumped by pg_dump version 10.2 (Debian 10.2-1.pgdg90+1)

    SET statement_timeout = 0;
    SET lock_timeout = 0;
    SET idle_in_transaction_session_timeout = 0;
    SET client_encoding = 'UTF8';
    SET standard_conforming_strings = on;
    SET check_function_bodies = false;
    SET client_min_messages = warning;
    SET row_security = off;

    --
    -- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: postgres
    --

    COMMENT ON DATABASE template1 IS 'default template for new databases';


    --
    -- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
    --

    CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


    --
    -- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
    --

    COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


    --
    -- PostgreSQL database dump complete
    --

    --
    -- PostgreSQL database cluster dump complete
    --
EOSQL