export type ScanDirectoryGeneratorOptions = {
  /**
   * Whether to include hidden files and directories (those starting with a dot).
   * Default is false.
   */
  includeHidden?: boolean;

  /**
   * A filter function to determine whether a file or directory should be included in the results.
   * The function receives the full path of the file or directory and should return true to include it, or false to exclude it.
   */
  filter?: (fullPath: string) => boolean;

  /**
   * The maximum depth to scan. A value of 0 means no limit.
   * Default is 0.
   */
  maxDepth?: number;
};
