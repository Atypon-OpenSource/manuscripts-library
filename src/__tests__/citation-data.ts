/*!
 * © 2023 Atypon Systems LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { BibliographyItem, Citation } from '@manuscripts/json-schema'

export const citationModels: Citation[] = [
  {
    _id: 'MPCitation:31E42852-8377-4550-8C25-9E602EE657B0',
    objectType: 'MPCitation',
    createdAt: 0,
    updatedAt: 0,
    containerID: 'MPProject:project',
    manuscriptID: 'MPManuscript:manuscript',
    embeddedCitationItems: [
      {
        _id: 'MPCitationItem:citation-item-1',
        objectType: 'MPCitationItem',
        bibliographyItem: 'MPBibliographyItem:bibliography-item-3',
      },
      {
        _id: 'MPCitationItem:citation-item-1',
        objectType: 'MPCitationItem',
        bibliographyItem: 'MPBibliographyItem:bibliography-item-2',
      },
    ],
  },
  {
    _id: 'MPCitation:D30D9817-5C61-49BC-8393-F45AE2995F87',
    objectType: 'MPCitation',
    createdAt: 0,
    updatedAt: 0,
    containerID: 'MPProject:F6BC14D2-BD56-4237-A24D-30928BFB6381',
    manuscriptID: 'MPManuscript:561C1FB2-3A94-4460-AB75-426F80BC7071',
    embeddedCitationItems: [
      {
        _id: 'MPCitationItem:30A8EA49-9238-4624-A0AE-EEE3BC5A7C96',
        objectType: 'MPCitationItem',
        bibliographyItem: 'MPBibliographyItem:bibliography-item-5',
      },
      {
        _id: 'MPCitationItem:A48BFD03-0DAF-4A82-9155-90F9C400D9E0',
        objectType: 'MPCitationItem',
        bibliographyItem: 'MPBibliographyItem:bibliography-item-1',
      },
      {
        _id: 'MPCitationItem:21AC812A-F3AF-410A-B192-742F8CD65A51',
        objectType: 'MPCitationItem',
        bibliographyItem: 'MPBibliographyItem:bibliography-item-4',
      },
    ],
  },
]

export const bibliographyItemModels: BibliographyItem[] = [
  {
    publisher: 'American Society for Clinical Investigation',
    issue: '12',
    DOI: '10.1172/jci18911',
    type: 'article-journal',
    page: '1813-1815',
    source: 'Crossref',
    title: 'AIP1: a new player in TNF signaling',
    volume: '111',
    author: [
      {
        given: 'M. Eugenia',
        family: 'Guicciardi',
        sequence: 'first',
        affiliation: [],
        _id: 'MPBibliographicName:50E2DB46-B3A8-4607-9038-4ACB7F88DA82',
        objectType: 'MPBibliographicName',
      },
      {
        given: 'Gregory J.',
        family: 'Gores',
        sequence: 'additional',
        affiliation: [],
        _id: 'MPBibliographicName:8677D9F7-F99B-4CEC-9D82-0E3AB7E477ED',
        objectType: 'MPBibliographicName',
      },
    ],
    'container-title': 'Journal of Clinical Investigation',
    'original-title': [],
    language: 'en',
    issued: {
      'date-parts': [[2003, 6, 15]],
      _id: 'MPBibliographicDate:BDE50F71-BA00-4388-B02D-DED120C9B814',
      objectType: 'MPBibliographicDate',
    },
    ISSN: ['0021-9738'],
    'container-title-short': 'J. Clin. Invest.',
    objectType: 'MPBibliographyItem',
    containerID: 'MPProject:project',
    manuscriptID: 'MPManuscript:manuscripts',
    createdAt: 0,
    updatedAt: 0,
    _id: 'MPBibliographyItem:bibliography-item-1',
  },
  {
    publisher: 'Public Library of Science (PLoS)',
    issue: '4',
    DOI: '10.1371/journal.pgen.1003450',
    type: 'article-journal',
    page: 'e1003450',
    source: 'Crossref',
    title:
      'Drosophila cyfip Regulates Synaptic Development and Endocytosis by Suppressing Filamentous Actin Assembly',
    volume: '9',
    author: [
      {
        given: 'Lu',
        family: 'Zhao',
        sequence: 'first',
        affiliation: [],
        _id: 'MPBibliographicName:F7065B5B-CE97-4968-98DF-EE59AD14F44C',
        objectType: 'MPBibliographicName',
      },
      {
        given: 'Dan',
        family: 'Wang',
        sequence: 'additional',
        affiliation: [],
        _id: 'MPBibliographicName:56BE88EE-08AA-4AC0-A6F9-48528DD68C8D',
        objectType: 'MPBibliographicName',
      },
      {
        given: 'Qifu',
        family: 'Wang',
        sequence: 'additional',
        affiliation: [],
        _id: 'MPBibliographicName:33E326CC-E0F3-43A3-AD51-1594E3AB3938',
        objectType: 'MPBibliographicName',
      },
      {
        given: 'Avital A.',
        family: 'Rodal',
        sequence: 'additional',
        affiliation: [],
        _id: 'MPBibliographicName:B12A5B3B-121B-481E-9E3A-3680787DD61E',
        objectType: 'MPBibliographicName',
      },
      {
        given: 'Yong Q.',
        family: 'Zhang',
        sequence: 'additional',
        affiliation: [],
        _id: 'MPBibliographicName:4AFA9795-BC64-4007-B0FD-CA427E2E212A',
        objectType: 'MPBibliographicName',
      },
    ],
    'container-title': 'PLoS Genetics',
    'original-title': [],
    language: 'en',
    editor: [
      {
        given: 'Bingwei',
        family: 'Lu',
        sequence: 'first',
        affiliation: [],
        _id: 'MPBibliographicName:5B41272A-2B3E-4ABA-B29B-13FDE06822D7',
        objectType: 'MPBibliographicName',
      },
    ],
    issued: {
      'date-parts': [[2013, 4, 4]],
      _id: 'MPBibliographicDate:4FAE4845-EC59-471E-90C1-86AEF30F86DB',
      objectType: 'MPBibliographicDate',
    },
    ISSN: ['1553-7404'],
    'container-title-short': 'PLoS Genet',
    objectType: 'MPBibliographyItem',
    containerID: 'MPProject:project',
    manuscriptID: 'MPManuscript:manuscripts',
    createdAt: 0,
    updatedAt: 0,
    _id: 'MPBibliographyItem:bibliography-item-2',
  },
  {
    publisher: 'Elsevier BV',
    issue: '6',
    DOI: '10.1016/j.cub.2008.02.014',
    type: 'article-journal',
    page: 'R259-R261',
    source: 'Crossref',
    title: 'Synaptic Endocytosis: Illuminating the Role of Clathrin Assembly',
    volume: '18',
    author: [
      {
        given: 'Avital A.',
        family: 'Rodal',
        sequence: 'first',
        affiliation: [],
        _id: 'MPBibliographicName:D592422B-EECC-48FA-B793-8CFAD6E23F9D',
        objectType: 'MPBibliographicName',
      },
      {
        given: 'J. Troy',
        family: 'Littleton',
        sequence: 'additional',
        affiliation: [],
        _id: 'MPBibliographicName:F50E0898-7EFA-4802-8D05-778170E5B5D8',
        objectType: 'MPBibliographicName',
      },
    ],
    'container-title': 'Current Biology',
    'original-title': [],
    language: 'en',
    issued: {
      'date-parts': [[2008, 3]],
      _id: 'MPBibliographicDate:9DDDCB5B-E81F-4E2C-9285-12B8879FE591',
      objectType: 'MPBibliographicDate',
    },
    ISSN: ['0960-9822'],
    'container-title-short': 'Current Biology',
    objectType: 'MPBibliographyItem',
    containerID: 'MPProject:project',
    manuscriptID: 'MPManuscript:manuscripts',
    createdAt: 0,
    updatedAt: 0,
    _id: 'MPBibliographyItem:bibliography-item-3',
  },
  {
    publisher: 'American Society for Cell Biology (ASCB)',
    issue: '7',
    DOI: '10.1091/mbc.e06-02-0135',
    type: 'article-journal',
    page: '2855-2868',
    source: 'Crossref',
    title:
      'Aip1 and Cofilin Promote Rapid Turnover of Yeast Actin Patches and Cables: A Coordinated Mechanism for Severing and Capping Filaments',
    volume: '17',
    author: [
      {
        given: 'Kyoko',
        family: 'Okada',
        sequence: 'first',
        affiliation: [
          {
            name: 'Department of Biology and Rosenstiel Basic Medical Science Research Center, Brandeis University, Waltham, MA 02454',
          },
        ],
        _id: 'MPBibliographicName:7AA09743-B363-4865-A16A-D85C81F755CA',
        objectType: 'MPBibliographicName',
      },
      {
        given: 'Harini',
        family: 'Ravi',
        sequence: 'additional',
        affiliation: [
          {
            name: 'Department of Biology and Rosenstiel Basic Medical Science Research Center, Brandeis University, Waltham, MA 02454',
          },
        ],
        _id: 'MPBibliographicName:428AB9F4-4D03-4CB6-BCD8-905CAFA6C0C0',
        objectType: 'MPBibliographicName',
      },
      {
        given: 'Ellen M.',
        family: 'Smith',
        sequence: 'additional',
        affiliation: [
          {
            name: 'Department of Biology and Rosenstiel Basic Medical Science Research Center, Brandeis University, Waltham, MA 02454',
          },
        ],
        _id: 'MPBibliographicName:44A10365-0FAF-4EA2-8E58-BD6DA195025A',
        objectType: 'MPBibliographicName',
      },
      {
        given: 'Bruce L.',
        family: 'Goode',
        sequence: 'additional',
        affiliation: [
          {
            name: 'Department of Biology and Rosenstiel Basic Medical Science Research Center, Brandeis University, Waltham, MA 02454',
          },
        ],
        _id: 'MPBibliographicName:4C49595A-F705-49B3-BECE-85357B406E23',
        objectType: 'MPBibliographicName',
      },
    ],
    'container-title': 'Molecular Biology of the Cell',
    'original-title': [],
    language: 'en',
    editor: [
      {
        given: 'David',
        family: 'Drubin',
        sequence: 'additional',
        affiliation: [],
        _id: 'MPBibliographicName:1DD9AE1D-B3AB-4DE6-836F-D48235F193A0',
        objectType: 'MPBibliographicName',
      },
    ],
    issued: {
      'date-parts': [[2006, 7]],
      _id: 'MPBibliographicDate:33CE6272-83DA-4689-8978-0A5B282F9326',
      objectType: 'MPBibliographicDate',
    },
    ISSN: ['1059-1524', '1939-4586'],
    'container-title-short': 'MBoC',
    objectType: 'MPBibliographyItem',
    containerID: 'MPProject:project',
    manuscriptID: 'MPManuscript:manuscripts',
    createdAt: 0,
    updatedAt: 0,
    _id: 'MPBibliographyItem:bibliography-item-4',
  },
  {
    publisher: 'American Society for Biochemistry & Molecular Biology (ASBMB)',
    issue: '36',
    DOI: '10.1074/jbc.m302773200',
    type: 'article-journal',
    page: '34373-34379',
    source: 'Crossref',
    title:
      'The Structure of Aip1p, a WD Repeat Protein That Regulates Cofilin-mediated Actin Depolymerization',
    volume: '278',
    author: [
      {
        given: 'Walter C.',
        family: 'Voegtli',
        sequence: 'first',
        affiliation: [],
        _id: 'MPBibliographicName:404E0701-FB75-4193-B2DF-35D44835F911',
        objectType: 'MPBibliographicName',
      },
      {
        given: 'A. Yarrow',
        family: 'Madrona',
        sequence: 'additional',
        affiliation: [],
        _id: 'MPBibliographicName:7025AF48-1729-456D-A3EB-83FB47D5D667',
        objectType: 'MPBibliographicName',
      },
      {
        given: 'David K.',
        family: 'Wilson',
        sequence: 'additional',
        affiliation: [],
        _id: 'MPBibliographicName:167E9A05-DCBC-4C12-BBE7-E9712C4983F2',
        objectType: 'MPBibliographicName',
      },
    ],
    'container-title': 'Journal of Biological Chemistry',
    'original-title': [],
    language: 'en',
    issued: {
      'date-parts': [[2003, 6, 14]],
      _id: 'MPBibliographicDate:FE1B706B-6227-42D6-A1F7-3FFCBBB8347B',
      objectType: 'MPBibliographicDate',
    },
    ISSN: ['0021-9258', '1083-351X'],
    'container-title-short': 'J. Biol. Chem.',
    objectType: 'MPBibliographyItem',
    containerID: 'MPProject:project',
    manuscriptID: 'MPManuscript:manuscripts',
    createdAt: 0,
    updatedAt: 0,
    _id: 'MPBibliographyItem:bibliography-item-5',
  },
]
