import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const client = new DynamoDBClient({});
const ddb = DynamoDBDocumentClient.from(client);
const ses = new SESClient({ region: "us-east-1" });

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");

    const lead = {
      lead_id:    `lead_${Date.now()}`,
      whatsapp:   body.whatsapp  || "Sin WhatsApp",
      email:      body.email     || "Sin email",
      rubro:      body.rubro     || "Sin rubro",
      created_at: body.timestamp || new Date().toISOString()
    };

    await ddb.send(
      new PutCommand({
        TableName: "devxter_leads",
        Item: lead
      })
    );

    await ses.send(
      new SendEmailCommand({
        Source: "poafromu@gmail.com",
        Destination: {
          ToAddresses: ["poafromu@gmail.com"]
        },
        Message: {
          Subject: {
            Data: "🔔 Nuevo lead en BROTHERS.tech"
          },
          Body: {
            Text: {
              Data: `Nuevo registro:\n\nWhatsApp: ${lead.whatsapp}\nCorreo: ${lead.email}\nNegocio: ${lead.rubro}\nFecha: ${lead.created_at}`
            }
          }
        }
      })
    );

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: JSON.stringify({ success: true, lead })
    };
  } catch (err) {
    console.error("ERROR:", err);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: err.message })
    };
  }
};
