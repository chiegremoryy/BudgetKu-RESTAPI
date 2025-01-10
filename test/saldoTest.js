const saldoHandler = require("../models/saldoHandler");
const saldoModel = require("../models/saldoModel");

jest.mock("../models/saldoModel");

describe("saldoHandler", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    jest.clearAllMocks();
    global.console.log = jest.fn();
    global.console.error = jest.fn();

    mockReq = {
      user: { email: "dummy@gmail.com" },
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("getSaldo", () => {
    it("should return total saldo successfully", async () => {
      const mockSaldoData = {
        total_pemasukan: 5000,  // Properti yang benar
        total_pengeluaran: 2000,  // Properti yang benar
        total_saldo: 3000,  // Properti yang benar
      };
    
      saldoModel.getSaldoData.mockResolvedValue(mockSaldoData);
    
      await saldoHandler(mockReq, mockRes);
    
      expect(saldoModel.getSaldoData).toHaveBeenCalledWith(mockReq.user.email);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: true,
        message: 'Total saldo berhasil dihitung',
        data: mockSaldoData,  // Data yang sesuai
      });
    });
    
      
    it("should return error if fetching saldo fails", async () => {
      saldoModel.getSaldoData.mockRejectedValue(new Error("Database error"));

      await saldoHandler(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Internal server error",
        error: expect.any(Error),
      });
    });
  });
});
