-- CreateTable
CREATE TABLE "TimeDeposit" (
    "id" SERIAL NOT NULL,
    "planType" TEXT NOT NULL,
    "days" INTEGER NOT NULL,
    "balance" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "TimeDeposit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Withdrawal" (
    "id" SERIAL NOT NULL,
    "timeDepositId" INTEGER NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Withdrawal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Withdrawal" ADD CONSTRAINT "Withdrawal_timeDepositId_fkey" FOREIGN KEY ("timeDepositId") REFERENCES "TimeDeposit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
