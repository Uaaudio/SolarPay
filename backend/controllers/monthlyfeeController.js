const cron = require("node-cron");
const MonthylFee = require("../database/models/monthlyfee");
const Houses = require("../database/models/house");

// Função que gera cobranças
async function FeeGenerate() {

  const Today = new Date();
  const Month = Today.getMonth() + 1;
  const Year = Today.getFullYear();

  // pega todas as casas do banco
  const houses = await Houses.findAll();

  // cria uma cobrança pra cada casa
  for (const house of houses) {
    await MonthylFee.create({
      month: Month,
      year: Year,
      payed: false,
      houseId: house.id
    });
  }
}

// Cron (rodar todo dia 1 do mês)
cron.schedule("0 0 1 * *", FeeGenerate, {
  timezone: "America/Sao_Paulo",
});

// exporta para chamar manualmente se quiser
module.exports = { FeeGenerate };
