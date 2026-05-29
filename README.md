# 📋 Devxter Leads — Sistema Serverless de Captación de Clientes

Sistema backend serverless construido en AWS para capturar y almacenar 
leads de clientes potenciales desde un formulario web.

## 🏗️ Arquitectura

Frontend (Vercel) → API Gateway → Lambda → DynamoDB
                                         → SES (notificación por correo)

## ⚙️ Servicios AWS utilizados

- **AWS Lambda** — procesa las solicitudes del formulario
- **API Gateway** — expone el endpoint REST público
- **DynamoDB** — almacena los leads capturados
- **SES** — envía notificación por correo al recibir un nuevo lead
- **CloudWatch** — monitoreo y logs de la función

## 📦 Estructura del proyecto

devxter-leads/
└── index.mjs    # Función Lambda principal

## 🚀 Flujo de funcionamiento

1. Usuario llena el formulario en la web
2. Frontend envía los datos al API Gateway
3. Lambda procesa y guarda el lead en DynamoDB
4. SES envía notificación automática por correo

## 🌐 Demo

[devxter.vercel.app](https://devxter.vercel.app)
