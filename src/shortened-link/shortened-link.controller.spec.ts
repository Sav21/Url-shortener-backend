import { Test, TestingModule } from "@nestjs/testing";
import { ShortenedLinkController } from "./shortened-link.controller";

describe("ShortenedLinkController", () => {
  let controller: ShortenedLinkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortenedLinkController],
    }).compile();

    controller = module.get<ShortenedLinkController>(ShortenedLinkController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
