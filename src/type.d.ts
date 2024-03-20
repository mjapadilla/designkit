declare module 'uploadcare-widget' {
  export type TUploadCareFile = {
    uuid: string;
    name: string;
    size: number;
    isStored: boolean;
    isImage: boolean;
    originalImageInfo: {
      dpi: string;
      width: number;
      format: string;
      height: number;
      sequence: boolean;
      color_mode: string;
      orientation: string;
      geo_location: string;
      datetime_original: string;
    };
    originalVideoInfo: string;
    originalContentInfo: {
      mime: {
        mime: string;
        type: string;
        subtype: string;
      };
      image: {
        dpi: string;
        width: number;
        format: string;
        height: number;
        sequence: string;
        color_mode: string;
        orientation: string;
        geo_location: string;
        datetime_original: string;
      };
    };
    mimeType: string;
    originalUrl: string;
    cdnUrl: string;
    cdnUrlModifiers: string;
  };

  export type TProgress = {
    state: 'uploading' | 'uploaded' | 'ready';
    progress: number;
  };

  export type TTabs = 'file' | 'url' | 'camera';

  export type TValidator = {
    isImage: boolean;
    mimeType: string;
  };

  interface UploadcareFile {
    // Define the properties you'll be using on the file object
    progress(callback: (info: TProgress) => void): UploadcareFile;
    done(callback: (file: TUploadCareFile) => void): UploadcareFile;
    // Add other properties as needed
  }

  interface UploadcareOptions {
    publicKey: string;
    tabs?: TTabs[];
    crop?: boolean | string; // Adjust the type based on your needs
    imagesOnly?: boolean;
    validators?: ((fileInfo: TValidator) => void)[];
  }

  interface Uploadcare {
    openDialog(
      element: HTMLElement | null,
      options: UploadcareOptions
    ): {
      done(callback: (file: UploadcareFile | null) => void): void;
      progress(callback: ({ state, progres }: TProgress) => void): void;
    };
  }

  // Declare the uploadcare object
  const uploadcare: Uploadcare;

  export = uploadcare;
}
