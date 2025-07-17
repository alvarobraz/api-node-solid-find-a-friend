-- Criar o ENUM BrazilianState
CREATE TYPE "BrazilianState" AS ENUM ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO');

-- Adicionar uma coluna temporária para armazenar as siglas
ALTER TABLE "orgs" ADD COLUMN "state_temp" "BrazilianState";

-- Mapear os valores existentes de state (String) para o ENUM
UPDATE "orgs" SET "state_temp" = CASE
  WHEN "state" = 'Acre' THEN 'AC'::"BrazilianState"
  WHEN "state" = 'Alagoas' THEN 'AL'::"BrazilianState"
  WHEN "state" = 'Amapá' THEN 'AP'::"BrazilianState"
  WHEN "state" = 'Amazonas' THEN 'AM'::"BrazilianState"
  WHEN "state" = 'Bahia' THEN 'BA'::"BrazilianState"
  WHEN "state" = 'Ceará' THEN 'CE'::"BrazilianState"
  WHEN "state" = 'Distrito Federal' THEN 'DF'::"BrazilianState"
  WHEN "state" = 'Espírito Santo' THEN 'ES'::"BrazilianState"
  WHEN "state" = 'Goiás' THEN 'GO'::"BrazilianState"
  WHEN "state" = 'Maranhão' THEN 'MA'::"BrazilianState"
  WHEN "state" = 'Mato Grosso' THEN 'MT'::"BrazilianState"
  WHEN "state" = 'Mato Grosso do Sul' THEN 'MS'::"BrazilianState"
  WHEN "state" = 'Minas Gerais' THEN 'MG'::"BrazilianState"
  WHEN "state" = 'Pará' THEN 'PA'::"BrazilianState"
  WHEN "state" = 'Paraíba' THEN 'PB'::"BrazilianState"
  WHEN "state" = 'Paraná' THEN 'PR'::"BrazilianState"
  WHEN "state" = 'Pernambuco' THEN 'PE'::"BrazilianState"
  WHEN "state" = 'Piauí' THEN 'PI'::"BrazilianState"
  WHEN "state" = 'Rio de Janeiro' THEN 'RJ'::"BrazilianState"
  WHEN "state" = 'Rio Grande do Norte' THEN 'RN'::"BrazilianState"
  WHEN "state" = 'Rio Grande do Sul' THEN 'RS'::"BrazilianState"
  WHEN "state" = 'Rondônia' THEN 'RO'::"BrazilianState"
  WHEN "state" = 'Roraima' THEN 'RR'::"BrazilianState"
  WHEN "state" = 'Santa Catarina' THEN 'SC'::"BrazilianState"
  WHEN "state" = 'São Paulo' THEN 'SP'::"BrazilianState"
  WHEN "state" = 'Sergipe' THEN 'SE'::"BrazilianState"
  WHEN "state" = 'Tocantins' THEN 'TO'::"BrazilianState"
  ELSE 'SP'::"BrazilianState" -- Valor padrão caso não haja correspondência
END;

-- Remover a coluna original state
ALTER TABLE "orgs" DROP COLUMN "state";

-- Renomear a coluna temporária para state
ALTER TABLE "orgs" RENAME COLUMN "state_temp" TO "state";

-- Tornar a coluna state obrigatória (NOT NULL)
ALTER TABLE "orgs" ALTER COLUMN "state" SET NOT NULL;