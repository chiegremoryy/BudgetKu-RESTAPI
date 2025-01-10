const pemasukanHandler = require("../models/pemasukanHandler");
const pemasukanModel = require("../models/pemasukanModel");

jest.mock("../models/pemasukanModel");

describe("pemasukanHandler", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    jest.clearAllMocks();
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

  describe("createPemasukan", () => {
    it("should create pemasukan and return success response", async () => {
      mockReq.body = {
        jumlah: 1000,
        keterangan: "Sample pemasukan",
        sumber_dana: "Gaji",
      };
      const mockData = { id: 1, ...mockReq.body, email: mockReq.user.email };

      pemasukanModel.createPemasukan.mockResolvedValue(mockData);

      await pemasukanHandler.createPemasukan(mockReq, mockRes);

      expect(pemasukanModel.createPemasukan).toHaveBeenCalledWith({
        ...mockReq.body,
        email: mockReq.user.email,
      });
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Pemasukan created successfully",
        data: mockData,
      });
    });

    it("should return error if database operation fails", async () => {
      mockReq.body = {
        jumlah: 1000,
        keterangan: "Sample pemasukan",
        sumber_dana: "Gaji",
      };

      pemasukanModel.createPemasukan.mockRejectedValue(
        new Error("Database error")
      );

      await pemasukanHandler.createPemasukan(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Internal server error",
        error: "Database error",
      });
    });
  });

  describe("getPemasukan", () => {
    it("should fetch pemasukan data with pagination", async () => {
        mockReq.query = { page: 1, limit: 10, keyword: "Gaji" };
        const mockData = [
          { id: 1, jumlah: 1000, keterangan: "Sample", sumber_dana: "Gaji" },
        ];
      
        pemasukanModel.getPemasukan.mockResolvedValue({
          data: mockData,
          count: 1,
        });
      
        await pemasukanHandler.getPemasukan(mockReq, mockRes);
      
        expect(pemasukanModel.getPemasukan).toHaveBeenCalledWith({
          email: mockReq.user.email,
          offset: 0,
          limit: 10,
          keyword: "Gaji",
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
      

    it("should handle database errors when fetching pemasukan", async () => {
      pemasukanModel.getPemasukan.mockRejectedValue(
        new Error("Database error")
      );

      await pemasukanHandler.getPemasukan(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Internal server error",
        error: "Database error",
      });
    });
  });

  describe("updatePemasukan", () => {
    it("should update pemasukan and return success response", async () => {
      mockReq.params.id = 1;
      mockReq.body = {
        jumlah: 2000,
        keterangan: "Updated pemasukan",
        sumber_dana: "Cash",
      };
      const mockData = { id: 1, ...mockReq.body, email: mockReq.user.email };

      pemasukanModel.updatePemasukan.mockResolvedValue(mockData);

      await pemasukanHandler.updatePemasukan(mockReq, mockRes);

      expect(pemasukanModel.updatePemasukan).toHaveBeenCalledWith({
        id: mockReq.params.id,
        email: mockReq.user.email,
        ...mockReq.body,
      });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Pemasukan updated successfully",
        data: mockData,
      });
    });

    it("should handle not found error when updating pemasukan", async () => {
      mockReq.params.id = 1;
      mockReq.body = {
        jumlah: 2000,
        keterangan: "Updated pemasukan",
        sumber_dana: "Cash",
      };

      pemasukanModel.updatePemasukan.mockResolvedValue(null);

      await pemasukanHandler.updatePemasukan(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Pemasukan not found or doesn't belong to the user",
      });
    });
  });

  describe("deletePemasukan", () => {
    it("should delete pemasukan and return success response", async () => {
      mockReq.params.id = 1;
      const mockData = { id: 1, email: mockReq.user.email };

      pemasukanModel.deletePemasukan.mockResolvedValue(mockData);

      await pemasukanHandler.deletePemasukan(mockReq, mockRes);

      expect(pemasukanModel.deletePemasukan).toHaveBeenCalledWith({
        id: mockReq.params.id,
        email: mockReq.user.email,
      });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Pemasukan deleted successfully",
        data: mockData,
      });
    });

    it("should handle not found error when deleting pemasukan", async () => {
      mockReq.params.id = 1;

      pemasukanModel.deletePemasukan.mockResolvedValue(null);

      await pemasukanHandler.deletePemasukan(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Pemasukan not found or doesn't belong to the user",
      });
    });
  });
});
