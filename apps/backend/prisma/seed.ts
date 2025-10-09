// prisma/seed.ts
/*
  Seed 
 */

import {
  MovementType,
  PrismaClient,
  TransactionStatus,
  UserRole,
} from "@prisma/client";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando seed do EcoFin...");

  // Tipos de usuários
  const userRoles = [UserRole.USER, UserRole.PREMIUM, UserRole.ADMIN] as const;
  const passwordHash = await bcrypt.hash("123456", 10);

  // Função para gerar usuários fake
  function generateUser(index: number, role: (typeof userRoles)[number]) {
    return {
      id: randomUUID(),
      name: `User_${role}_${index}`,
      email: `user_${role}_${index}@ecofin.test`,
      password: passwordHash,
      role,
      avatar: `https://i.pravatar.cc/150?img=${index}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  const allUsers: any[] = [];

  // Criar 15 usuários de cada tipo
  for (const type of userRoles) {
    for (let i = 1; i <= 15; i++) {
      const user = generateUser(i, type);
      console.log(user);
      allUsers.push(user);
    }
  }

  // Inserir usuários no banco
  for (const user of allUsers) {
    await prisma.user.create({
      data: user,
    });
  }

  console.log("Usuários criados...");

  // Função para gerar transações fake
  function generateTransaction(userId: string, index: number) {
    const totalAmount = Math.floor(Math.random() * 2000) + 50;

    const paidAmount = Math.floor(Math.random() * totalAmount);

    const pendingAmount = totalAmount - paidAmount;
    const status =
      pendingAmount <= 0 ? TransactionStatus.PAID : TransactionStatus.PENDING;

    const typeRandom = Math.floor(Math.random() * 10) + 1;
    const type = typeRandom <= 5 ? MovementType.EXPENSE : MovementType.INCOME;

    return {
      id: randomUUID(),
      userId,
      title: `Transação ${index}`,
      type,
      amountTotal: totalAmount,
      paidAmount,
      pendingAmount,
      status,
      date: new Date(),
      note: `Transação ${index} obs`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  // Criar 10 transações para cada usuário
  for (const user of allUsers) {
    for (let i = 1; i <= 10; i++) {
      const transaction = generateTransaction(user.id, i);
      console.log(transaction);
      await prisma.transaction.create({ data: transaction });
    }
  }

  console.log("Transações criadas...");

  console.log("Transações recorrentes criadas...");

  console.log("Seed finalizada!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
