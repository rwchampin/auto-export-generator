import { promises as fsPromises } from 'fs';
import { generateComponentsIndex } from '../src/generateComponentsIndex';
import jest from 'jest';

jest.mock('fs', () => ({
  promises: {
    writeFile: jest.fn(),
  },
}));

describe('generateComponentsIndex', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should generate the correct export statements and update the index file', async () => {
    const mockGlob = jest.fn((pattern: string, callback: (error: Error | null, files: string[]) => void) => {
      callback(null, ['components/Button.js', 'components/TextField.ts']);
    });

    jest.doMock('glob', () => ({
      __esModule: true,
      default: mockGlob,
    }));

    await generateComponentsIndex();

    const expectedIndexContent = "export { default as Button } from './components/Button.js';\nexport { default as TextField } from './components/TextField.ts';";

    expect(fsPromises.writeFile).toHaveBeenCalledWith('components/index.js', expectedIndexContent);
  });

  it('should handle error during glob operation', async () => {
    const mockGlob = jest.fn((pattern: string, callback: (error: Error | null, files: string[]) => void) => {
      callback(new Error('Glob error'), []);
    });

    jest.doMock('glob', () => ({
      __esModule: true,
      default: mockGlob,
    }));

    await expect(generateComponentsIndex()).rejects.toThrow('Glob error');
    expect(fsPromises.writeFile).not.toHaveBeenCalled();
  });

  it('should handle error during file write operation', async () => {
    const mockGlob = jest.fn((pattern: string, callback: (error: Error | null, files: string[]) => void) => {
      callback(null, ['components/Button.js']);
    });

    const mockWriteFile = jest.spyOn(fsPromises, 'writeFile').mockRejectedValue(new Error('Write file error'));

    jest.doMock('glob', () => ({
      __esModule: true,
      default: mockGlob,
    }));

    await expect(generateComponentsIndex()).rejects.toThrow('Write file error');
    expect(mockWriteFile).toHaveBeenCalledWith('components/index.js', expect.any(String));
  });
});
