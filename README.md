PDBe-KB Gallery Component
=

[![Build Status](https://www.travis-ci.com/PDBe-KB/component-image-gallery.svg?branch=main)](https://www.travis-ci.com/PDBe-KB/component-image-gallery)
[![codecov](https://codecov.io/gh/PDBe-KB/component-image-gallery/branch/main/graph/badge.svg?token=CjBzPrqddz)](https://codecov.io/gh/PDBe-KB/component-image-gallery)
[![Maintainability](https://api.codeclimate.com/v1/badges/87a94f87fe1c42776b7c/maintainability)](https://codeclimate.com/github/PDBe-KB/component-image-gallery/maintainability)

This repository is for the codebase of a lightweight Angular v7 web component that displays images for molecular entities in a gallery.

This web component is used on PDBe-KB Aggregated Views of Proteins and Aggregated Views of Ligands to display macromolecular interaction partners and ligands.

Note: This component uses the "molstar-dialog" web component available at [https://github.com/PDBe-KB/component-molstar-dialog](https://github.com/PDBe-KB/component-molstar-dialog) and the download component available at [https://github.com/PDBe-KB/component-download](https://github.com/PDBe-KB/component-download)

### Example:

<img src="https://raw.githubusercontent.com/PDBe-KB/component-image-gallery/main/pdbe-kb-gallery.png">

## Quick Start

Get the code and install dependencies
```
git clone https://github.com/PDBe-KB/component-image-gallery.git
cd component-image-gallery
npm i
```

Running the app
```
ng serve
```

Running tests
```
ng test
```

## Dependencies

This web component embeds two other PDBe-KB web components: [https://github.com/PDBe-KB/component-download](https://github.com/PDBe-KB/component-download) and [https://github.com/PDBe-KB/component-molstar-dialog](https://github.com/PDBe-KB/component-molstar-dialog)

In order to use all the features of this web component, retrieve the "molstar-dialog" and "download" components and replace the contents of the `src/app/molstar-dialog` and `src/app/download` folders with those files.


The main template (i.e. `index.html` by default) should also have the following CSS imports:
```angular2html
<link rel="stylesheet" href="https://ebi.emblstatic.net/web_guidelines/EBI-Framework/v1.3/css/ebi-global.css" type="text/css" media="all"/>
<link rel="stylesheet" href="https://ebi.emblstatic.net/web_guidelines/EBI-Icon-fonts/v1.3/fonts.css" type="text/css" media="all"/>
<link rel="stylesheet" href="https://ebi.emblstatic.net/web_guidelines/EBI-Framework/v1.3/css/theme-pdbe-green.css" type="text/css" media="all"/>
```

## Basic usage

The component can be added to any Angular v7 apps.

#### 1.) Import the component:

Import the component in `app.module.ts` by default.
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GalleryComponent } from './gallery/gallery.component';
import { MolstarDialogComponent } from './molstar-dialog/molstar-dialog.component';
import { DownloadComponent } from './download/download.component';
import {MatDialogModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    MolstarDialogComponent,
    DownloadComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

#### 2.) Add the component to a template:
```angular2html
<app-gallery [data]="data"></app-gallery>
```

The data model for the input data is described in 
`src/app/gallery/gallery.models.ts`

##### Example input data

```angular2html
ligands = {
    'title': 'All Ligands',
    'help_text': 'This section, by default, shows ligands observed directly bound to the ' +
      'protein of interest, if such ligands are available. \nClick on the checkbox to see ' +
      'every ligand from all PDB entries (some may not directly interact with the protein). ' +
      'If there are no directly interacting ligands, all ligands will be shown by default \nClick on ' +
      'the images to see the related PDB entries. For ligand binding residues, see the section below.',
    'div_id': 'ligands',
    'ligandGallery': true,
    'gallery_items': [
      {
        'url': 'https://www.ebi.ac.uk/pdbe/static/files/pdbechem_v2/SAM_200.svg',
        'alt_text': 'S-ADENOSYLMETHIONINE',
        'label': 'S-ADENOSYLMETHIONINE',
        'sub_label': 13,
        'id_code': 'SAM',
        'categories': [
          'cofactor-like'
        ],
        'related_entries': [
          '7bq7',
          '6w61',
          '6w4h',
          '7koa',
          '6wvn',
          '6wks',
          '6w75',
          '7jpe',
          '7jyy',
          '6xkm',
          '7jib',
          '7c2i',
          '7c2j'
        ],
        'elements': [
          {
            'label': 'SAM',
            'url': 'https://www.ebi.ac.uk/pdbe/entry/pdb/7bq7/ligands'
          }
        ],
        'target_url': 'https://www.ebi.ac.uk/pdbe/entry/search/index/?search' +
          'Params=%7B%22text%22:%5B%7B%22value%22:%22P0DTD1%22,%22condition1%22:%22AND%22,' +
          '%22condition2%22:%22Contains%22%7D%5D,%22q_compound_id%22:%5B%7B%22value%22:%22SAM%22,' +
          '%22condition1%22:%22AND%22,%22condition2%22:%22Contains%22%7D%5D,%22resultState%22:%7B%22tabIndex%22:0,' +
          '%22paginationIndex%22:1,%22perPage%22:%2210%22,%22sortBy%22:%22Sort%20by%22%7D%7D',
        'buttons': [],
        'flag': true,
        'div_id': 'ligands'
      }
    ]
  };
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/PDBe-KB/component-image-gallery/tags).

## Authors

* **Mihaly Varadi** - *Initial Implementation* - [mvaradi](https://github.com/mvaradi)

See also the list of [contributors](https://github.com/PDBe-KB/component-image-gallery/contributors) who participated in this project.

## License

This project is licensed under the EMBL-EBI License - see the [LICENSE](LICENSE) file for details

## Acknowledgements

We would like to thank the [PDBe team](https://www.pdbe.org) and the [PDBe-KB partner resources](https://github.com/PDBe-KB/pdbe-kb-manual/wiki/PDBe-KB-Annotations) for their feedback and contributions.
