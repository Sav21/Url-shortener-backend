import { Test, TestingModule } from "@nestjs/testing";
import { ShortenedLinkService } from "./shortened-link.service";

describe("ShortenedLinkService", () => {
  let service: ShortenedLinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShortenedLinkService],
    }).compile();

    service = module.get<ShortenedLinkService>(ShortenedLinkService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
