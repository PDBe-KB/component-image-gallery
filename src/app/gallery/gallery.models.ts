/*
These classes store information to be shown for a gallery of images
*/

export class Gallery {
  title: string; // Title of the gallery, e.g. "Ligands"
  help_text: string; // Description for the gallery to help users
  div_id: string; // Div identifier
  ligandGallery?: boolean;
  gallery_items: GalleryItem[];
}

export class GalleryItem {
  url: string; // URL of the image
  alt_text: string; // Text to be shown if image is not rendered
  label: string; // Label for the image
  id_code: string; // Identifier
  sub_label: number; // Sub-label for the image
  target_url: string; // Target URL where the image links on click
  related_entries: string[]; // List of related identifiers, i.e. PDB ids
  categories: string[];
  flag: boolean; // Is the ligand directly interacting
  elements: Elements[];
  buttons: GalleryButton[];
}

export class GalleryButton {
  class: string; // Button class following EBI style
  text: string; // Text on the button
  target_url: string; // Target URL where the button links on click
}

export class Elements {
  label: string; // Label for the element, e.g. 2etx
  url: string; // URL to link to
}
