create table CLIENTES
(
    ID BIGINT auto_increment
        primary key,
    DIRECCION VARCHAR(255),
    PAPELLIDO VARCHAR(80) not null,
    PNOMBRE VARCHAR(80) not null,
    SAPELLIDO VARCHAR(80),
    SNOMBRE VARCHAR(80),
    TELEFONO BIGINT
);

create table CUENTAS
(
    ID BIGINT auto_increment
        primary key,
    NUMERO BIGINT not null,
    SALDO DECIMAL(18,4) not null,
    ID_CLIENTE BIGINT not null,
    constraint FKL7QJCO9QN0MAI4BXJXEE01VWR
        foreign key (ID_CLIENTE) references CLIENTES (ID)
);

create table MOVIMIENTOS
(
    ID BIGINT auto_increment
        primary key,
    FECHA TIMESTAMP not null,
    DEBITO BOOLEAN not null,
    VALOR DECIMAL(18,4) not null,
    ID_CUENTA BIGINT not null,
    constraint FKLEBENVY2R7BF11M3TFI8UC9GU
        foreign key (ID_CUENTA) references CUENTAS (ID)
);

