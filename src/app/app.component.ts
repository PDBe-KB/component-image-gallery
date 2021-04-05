import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
}
