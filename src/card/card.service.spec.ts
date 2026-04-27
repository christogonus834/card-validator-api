import { CardService } from './card.service';

describe('CardService', () => {
  let service: CardService;

  beforeEach(() => {
    service = new CardService();
  });

  it('should return valid for a correct Luhn card number', () => {
    const result = service.validateCard('4111111111111111');
    expect(result.valid).toBe(true);
  });

  it('should return invalid for a wrong card number', () => {
    const result = service.validateCard('1234567890123456');
    expect(result.valid).toBe(false);
  });

  it('should reject letters in card number', () => {
    const result = service.validateCard('abcd1234efgh5678');
    expect(result.valid).toBe(false);
  });

  it('should reject a number that is too short', () => {
    const result = service.validateCard('411111');
    expect(result.valid).toBe(false);
  });

  it('should handle card numbers with spaces', () => {
    const result = service.validateCard('4111 1111 1111 1111');
    expect(result.valid).toBe(true);
  });
});