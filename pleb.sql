PGDMP  8        
            |            main    15.7 #   16.3 (Ubuntu 16.3-0ubuntu0.24.04.1) !    
           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            
           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            
           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            
           1262    32768    main    DATABASE     f   CREATE DATABASE main WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE main;
             	   nzaih1999    false            
           0    0    DATABASE main    ACL     .   GRANT ALL ON DATABASE main TO neon_superuser;
                	   nzaih1999    false    2586            �            1259    57357    Account    TABLE     l  CREATE TABLE public."Account" (
    id text NOT NULL,
    "userId" text NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at integer,
    refresh_token_expires_in integer,
    token_type text,
    scope text,
    id_token text,
    session_state text
);
    DROP TABLE public."Account";
       public         heap 	   nzaih1999    false            �            1259    65705    Follows    TABLE     c   CREATE TABLE public."Follows" (
    "followerId" text NOT NULL,
    "followingId" text NOT NULL
);
    DROP TABLE public."Follows";
       public         heap 	   nzaih1999    false            �            1259    57364    Session    TABLE     �   CREATE TABLE public."Session" (
    id text NOT NULL,
    "sessionToken" text NOT NULL,
    "userId" text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);
    DROP TABLE public."Session";
       public         heap 	   nzaih1999    false            �            1259    57371    User    TABLE     �   CREATE TABLE public."User" (
    id text NOT NULL,
    name text,
    bio text,
    age integer,
    email text,
    "emailVerified" timestamp(3) without time zone,
    image text
);
    DROP TABLE public."User";
       public         heap 	   nzaih1999    false            �            1259    57378    VerificationToken    TABLE     �   CREATE TABLE public."VerificationToken" (
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);
 '   DROP TABLE public."VerificationToken";
       public         heap 	   nzaih1999    false            �            1259    57346    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap 	   nzaih1999    false            
          0    57357    Account 
   TABLE DATA           �   COPY public."Account" (id, "userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, refresh_token_expires_in, token_type, scope, id_token, session_state) FROM stdin;
    public       	   nzaih1999    false    215   r(       
          0    65705    Follows 
   TABLE DATA           @   COPY public."Follows" ("followerId", "followingId") FROM stdin;
    public       	   nzaih1999    false    219   �)       
          0    57364    Session 
   TABLE DATA           J   COPY public."Session" (id, "sessionToken", "userId", expires) FROM stdin;
    public       	   nzaih1999    false    216   2*       
          0    57371    User 
   TABLE DATA           S   COPY public."User" (id, name, bio, age, email, "emailVerified", image) FROM stdin;
    public       	   nzaih1999    false    217   *+       
          0    57378    VerificationToken 
   TABLE DATA           I   COPY public."VerificationToken" (identifier, token, expires) FROM stdin;
    public       	   nzaih1999    false    218   �+       
          0    57346    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public       	   nzaih1999    false    214   �+       q	           2606    57363    Account Account_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Account" DROP CONSTRAINT "Account_pkey";
       public         	   nzaih1999    false    215            |	           2606    65711    Follows Follows_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public."Follows"
    ADD CONSTRAINT "Follows_pkey" PRIMARY KEY ("followerId", "followingId");
 B   ALTER TABLE ONLY public."Follows" DROP CONSTRAINT "Follows_pkey";
       public         	   nzaih1999    false    219    219            t	           2606    57370    Session Session_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Session" DROP CONSTRAINT "Session_pkey";
       public         	   nzaih1999    false    216            x	           2606    57377    User User_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public         	   nzaih1999    false    217            o	           2606    57354 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public         	   nzaih1999    false    214            r	           1259    57383 &   Account_provider_providerAccountId_key    INDEX     ~   CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON public."Account" USING btree (provider, "providerAccountId");
 <   DROP INDEX public."Account_provider_providerAccountId_key";
       public         	   nzaih1999    false    215    215            u	           1259    57384    Session_sessionToken_key    INDEX     a   CREATE UNIQUE INDEX "Session_sessionToken_key" ON public."Session" USING btree ("sessionToken");
 .   DROP INDEX public."Session_sessionToken_key";
       public         	   nzaih1999    false    216            v	           1259    57385    User_email_key    INDEX     K   CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);
 $   DROP INDEX public."User_email_key";
       public         	   nzaih1999    false    217            y	           1259    57387 &   VerificationToken_identifier_token_key    INDEX     |   CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON public."VerificationToken" USING btree (identifier, token);
 <   DROP INDEX public."VerificationToken_identifier_token_key";
       public         	   nzaih1999    false    218    218            z	           1259    57386    VerificationToken_token_key    INDEX     e   CREATE UNIQUE INDEX "VerificationToken_token_key" ON public."VerificationToken" USING btree (token);
 1   DROP INDEX public."VerificationToken_token_key";
       public         	   nzaih1999    false    218            }	           2606    57388    Account Account_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 I   ALTER TABLE ONLY public."Account" DROP CONSTRAINT "Account_userId_fkey";
       public       	   nzaih1999    false    217    2424    215            	           2606    65712    Follows Follows_followerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Follows"
    ADD CONSTRAINT "Follows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 M   ALTER TABLE ONLY public."Follows" DROP CONSTRAINT "Follows_followerId_fkey";
       public       	   nzaih1999    false    2424    219    217            �	           2606    65717     Follows Follows_followingId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Follows"
    ADD CONSTRAINT "Follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 N   ALTER TABLE ONLY public."Follows" DROP CONSTRAINT "Follows_followingId_fkey";
       public       	   nzaih1999    false    2424    219    217            ~	           2606    57393    Session Session_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 I   ALTER TABLE ONLY public."Session" DROP CONSTRAINT "Session_userId_fkey";
       public       	   nzaih1999    false    217    2424    216                       826    106497     DEFAULT PRIVILEGES FOR SEQUENCES    DEFAULT ACL     {   ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;
          public          cloud_admin    false                       826    106496    DEFAULT PRIVILEGES FOR TABLES    DEFAULT ACL     x   ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;
          public          cloud_admin    false            
   b  x�u�K��0��u�1�ҖZ��:^Ft�5&�r)7�ï��,�����K;��ΉGD[�"JE �W	��%�.��)�J����CEƲL����ɬ���>=���K���ԫ�\�k���(_��O7{�1��Y�\��b���"kZ왽jbH��|���)^����X	c�$�+��~��)�	�Pϰ��2L	E�IfʘBn.����>�h��H�f�8��"��!*1x��y�,ݘ��&�_����H��y8����bE�ImM��}I�I�R���T���ws}����h�Yq������k����m�.����Ɍ�u3�Qo�Ћ��(NM�ڧ몓���L"L�c^>F��/>���      
   >   x�K��H�L���2 �l�t������d�䜌t��r�Db��iv���Q�Y^6W� >\       
   �   x���[n�0��gXE6`4{���� �	�����I�>w��u�|�</ ��Io{��\�;�$5*��Sc10h6N&�.��myoN>oK��ߩC@%��X���n`���F���oP�4>�W�Y�-J��dMB�B��I"@Ae�S���1��C�T�x3K�J� {�<� ʽ�,�m�m��ݯ]��Cj��l�`E�Q�(;��Q�x(���yeMܿ}�� ��_�      
   �   x��ͻ�0��}
� 
������ŕ�Xj[i-
O�eq6���V+v��1ϻ��RS`G�NJҜ~i�i�0��q���:\�$Gѣ��#ѻ8�I��5g����������	�q�퀠�� :8@r�#�~#4��$�W0:�ʁ���?|��<���7��y�Kw      
      x������ � �      
   �   x�e�MJA��ݧ��T���T��``HW%�ܨ�G������E�8$G�i=���U���bF��4Yc��Gv볹r�4�6���tQ1�.GF�l\������c�Y6@0�'��*(6����,�����hP�;�k(k(r8�^AK"R0C�)�o�ZY����I�I�pLh g`�9�xf͇!�
�H��u'���Vy�#��A������n��-��_�u]� \Za     