const pengeluaranHandler = require("../models/pengeluaranHandler");
const pengeluaranModel = require("../models/pengeluaranModel");

jest.mock("../models/pengeluaranModel");

describe("pengeluaranHandler", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    jest.clearAllMocks();
    global.console.log = jest.fn();
    global.console.error = jest.fn();

    mockReq = {
      body: {},
      params: {},
      query: {},
      user: { email: "dummy@gmail.com" },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("createPengeluaran", () => {
    it("should create pengeluaran and return success response", async () => {
      mockReq.body = {
        jumlah: 1000,
        keterangan: "Sample pengeluaran",
        keperluan: "Office supplies",
      };
      const mockData = { id: 1, ...mockReq.body, email: mockReq.user.email };

      pengeluaranModel.createPengeluaran.mockResolvedValue(mockData);

      await pengeluaranHandler.createPengeluaran(mockReq, mockRes);

      expect(pengeluaranModel.createPengeluaran).toHaveBeenCalledWith({
        ...mockReq.body,
        email: mockReq.user.email,
      });
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Pengeluaran created successfully",
        data: mockData,
      });
    });

    it("should return error if database operation fails", async () => {
      mockReq.body = {
        jumlah: 1000,
        keterangan: "Sample pengeluaran",
        keperluan: "Office supplies",
      };

      pengeluaranModel.createPengeluaran.mockRejectedValue(
        new Error("Database error")
      );

      await pengeluaranHandler.createPengeluaran(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Internal server error",
        error: "Database error",
      });
    });
  });

  describe("getPengeluaran", () => {
    it("should fetch pengeluaran data with pagination", async () => {
      mockReq.query = { page: 1, limit: 10, keyword: "Office" };
      const mockData = [
        { id: 1, jumlah: 1000, keterangan: "Sample", keperluan: "Office supplies" },
      ];

      pengeluaranModel.getPengeluaran.mockResolvedValue({
        data: mockData,
        count: 1,
      });

      await pengeluaranHandler.getPengeluaran(mockReq, mockRes);

      expect(pengeluaranModel.getPengeluaran).toHaveBeenCalledWith({
        email: mockReq.user.email,
        offset: 0,
        limit: 10,
        keyword: "Office",
      });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        data: mockData,
        pagination: {
          page: 1,
          limit: 10,
          total: 1,
        },
      });
    });

    it("should handle database errors when fetching pengeluaran", async () => {
      pengeluaranModel.getPengeluaran.mockRejectedValue(
        new Error("Database error")
      );

      await pengeluaranHandler.getPengeluaran(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Internal server error",
        error: "Database error",
      });
    });
  });

  describe("updatePengeluaran", () => {
    it("should update pengeluaran and return success response", async () => {
      mockReq.params.id = 1;
      mockReq.body = {
        jumlah: 2000,
        keterangan: "Updated pengeluaran",
        keperluan: "Office supplies",
      };
      const mockData = { id: 1, ...mockReq.body, email: mockReq.user.email };

      pengeluaranModel.updatePengeluaran.mockResolvedValue(mockData);

      await pengeluaranHandler.updatePengeluaran(mockReq, mockRes);

      expect(pengeluaranModel.updatePengeluaran).toHaveBeenCalledWith({
        id: mockReq.params.id,
        email: mockReq.user.email,
        ...mockReq.body,
      });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Pengeluaran updated successfully",
        data: mockData,
      });
    });

    it("should handle not found error when updating pengeluaran", async () => {
      mockReq.params.id = 1;
      mockReq.body = {
        jumlah: 2000,
        keterangan: "Updated pengeluaran",
        keperluan: "Office supplies",
      };

      pengeluaranModel.updatePengeluaran.mockResolvedValue(null);

      await pengeluaranHandler.updatePengeluaran(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Pengeluaran not found or doesn't belong to the user",
      });
    });
  });

  describe("deletePengeluaran", () => {
    it("should delete pengeluaran and return success response", async () => {
      mockReq.params.id = 1;
      const mockData = { id: 1, email: mockReq.user.email };

      pengeluaranModel.deletePengeluaran.mockResolvedValue(mockData);

      await pengeluaranHandler.deletePengeluaran(mockReq, mockRes);

      expect(pengeluaranModel.deletePengeluaran).toHaveBeenCalledWith({
        id: mockReq.params.id,
        email: mockReq.user.email,
      });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Pengeluaran deleted successfully",
        data: mockData,
      });
    });

    it("should handle not found error when deleting pengeluaran", async () => {
      mockReq.params.id = 1;

      pengeluaranModel.deletePengeluaran.mockResolvedValue(null);

      await pengeluaranHandler.deletePengeluaran(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Pengeluaran not found or doesn't belong to the user",
      });
    });
  });
});
