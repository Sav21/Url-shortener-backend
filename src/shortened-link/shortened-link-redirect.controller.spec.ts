import { Test, TestingModule } from '@nestjs/testing';
import { ShortenedLinkRedirectController } from './shortened-link-redirect.controller';

describe('ShortenedLinkRedirectController', () => {
  let controller: ShortenedLinkRedirectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortenedLinkRedirectController],
    }).compile();

    controller = module.get<ShortenedLinkRedirectController>(ShortenedLinkRedirectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
