# [0.10.0](https://github.com/mattrglobal/jsonld-signatures-bbs/compare/v0.9.0...v0.10.0) (2021-05-26)

### BREAKING CHANGES

Support for NodeJS v10 has been deprecated due to it now being [EOL](https://nodejs.org/en/about/releases/)

### Bug Fixes

- change the way of converting blank node ids ([#129](https://github.com/mattrglobal/jsonld-signatures-bbs/issues/129)) ([8e85b0f](https://github.com/mattrglobal/jsonld-signatures-bbs/commit/8e85b0f1ddcee2d4a17f7dc8d4e5fff55c989df6)), closes [#128](https://github.com/mattrglobal/jsonld-signatures-bbs/issues/128)

### Features

- bump bbs-signatures dependency ([#131](https://github.com/mattrglobal/jsonld-signatures-bbs/issues/131)) ([0644298](https://github.com/mattrglobal/jsonld-signatures-bbs/commit/06442984574d45f2fc87ceb5a34e353f03015688)), closes [#119](https://github.com/mattrglobal/jsonld-signatures-bbs/issues/119) and [#102](https://github.com/mattrglobal/jsonld-signatures-bbs/issues/119)

# [0.9.0](https://github.com/mattrglobal/jsonld-signatures-bbs/compare/v0.8.0...v0.9.0) (2021-04-05)

### Features

- use local context instead of security v3 ([#116](https://github.com/mattrglobal/jsonld-signatures-bbs/issues/116)) ([e8c6b9c](https://github.com/mattrglobal/jsonld-signatures-bbs/commit/e8c6b9c3d30afea3eade7ffa45954c17190aa41c))

# [0.8.0](https://github.com/mattrglobal/jsonld-signatures-bbs/compare/v0.7.0...v0.8.0) (2021-02-24)

### Bug Fixes

- addresses bug with blank nodes that was breaking nested reveals ([#96](https://github.com/mattrglobal/jsonld-signatures-bbs/issues/96)) ([6c347fd](https://github.com/mattrglobal/jsonld-signatures-bbs/commit/6c347fd9f17940842509ef3e04051cfaccc83361)), closes [#91](https://github.com/mattrglobal/jsonld-signatures-bbs/issues/91)
- update blsCreateProof expected response to promise ([#98](https://github.com/mattrglobal/jsonld-signatures-bbs/issues/98)) ([2523b47](https://github.com/mattrglobal/jsonld-signatures-bbs/commit/2523b47f6399873ed1916e518721a273bf3872b0))

### Features

- **sample:** update to v0.7.0 release ([#80](https://github.com/mattrglobal/jsonld-signatures-bbs/issues/80)) ([38747e6](https://github.com/mattrglobal/jsonld-signatures-bbs/commit/38747e61c2b1a4bd763cdf995535dfc589c28b2d))
- add nonce parameter to deriveProof method ([#100](https://github.com/mattrglobal/jsonld-signatures-bbs/issues/100)) ([8d414d9](https://github.com/mattrglobal/jsonld-signatures-bbs/commit/8d414d97f99226194301c4bbf2d565cfedcaf43a))
- adds support for providing a proofDocument with multiple proofs ([#82](https://github.com/mattrglobal/jsonld-signatures-bbs/issues/82)) ([1bb9a17](https://github.com/mattrglobal/jsonld-signatures-bbs/commit/1bb9a17254810a7eef3181cec0a2ad60a726246d)), closes [#79](https://github.com/mattrglobal/jsonld-signatures-bbs/issues/79)
- bump bbs-signatures package version ([#107](https://github.com/mattrglobal/jsonld-signatures-bbs/issues/107)) ([edf78a7](https://github.com/mattrglobal/jsonld-signatures-bbs/commit/edf78a77c05723175d2cc17ee8ff523e648a78dc))
- export types ([#78](https://github.com/mattrglobal/jsonld-signatures-bbs/issues/78)) ([c66d438](https://github.com/mattrglobal/jsonld-signatures-bbs/commit/c66d43823c11a38e3d9f13242f726d5f0371d3fd))
- migrate to async api ([#106](https://github.com/mattrglobal/jsonld-signatures-bbs/issues/106)) ([01000b4](https://github.com/mattrglobal/jsonld-signatures-bbs/commit/01000b4bf48932a47d7c8c889d2201f8e8085d46))
- migrate to using security context ([2673a0a](https://github.com/mattrglobal/jsonld-signatures-bbs/commit/2673a0a077c232ca5be61b93339be547e5341635))

### BREAKING CHANGES

- The type IRI for BBS signatures now stems from the https://w3id.org/security namespace, meaning all future signing and verifications using the signature suite will now use that namespace rather than the placeholder namespace that was being used. Note - this means verifying signatures and proofs issued with older versions of this library will not work.

# [0.7.0](https://github.com/mattrglobal/jsonld-signatures-bbs/compare/v0.6.0...v0.7.0) (2020-08-28)

### Bug Fixes

- json-ld context issue ([a911440](https://github.com/mattrglobal/jsonld-signatures-bbs/commit/a9114404dede2a736cf37ca2588b62ad5d6a4492))

### Features

- add the ability to specify the key pair class when creating suites([#66](https://github.com/mattrglobal/jsonld-signatures-bbs/issues/66)) ([1fb03cf](https://github.com/mattrglobal/jsonld-signatures-bbs/commit/1fb03cf2b2a26ba1c79e8b4eaa836bc24c3763e7))
- update sample to use latest package version ([cdd9b39](https://github.com/mattrglobal/jsonld-signatures-bbs/commit/cdd9b3932e2d5022c9ecc78573e232bcc1d3cdfc))
- update to use bbs-signatures ([#73](https://github.com/mattrglobal/jsonld-signatures-bbs/issues/73)) ([540ccec](https://github.com/mattrglobal/jsonld-signatures-bbs/commit/540ccecbe6f755db7975615cdd23e6b88ee16b3f))
- use bbs-signatures library ([#61](https://github.com/mattrglobal/jsonld-signatures-bbs/issues/61)) ([dbbd4e5](https://github.com/mattrglobal/jsonld-signatures-bbs/commit/dbbd4e569169781cd56dabc6d1290578cd773560))

# [0.6.0](https://github.com/mattrglobal/jsonld-signatures-bbs/compare/v0.5.0...v0.6.0) (2020-05-26)

### Features

- update bbs dependency ([20d6f62](https://github.com/mattrglobal/jsonld-signatures-bbs/commit/20d6f622a5270704f3e5744c2790ce6042c37491))
- update sample ([#49](https://github.com/mattrglobal/jsonld-signatures-bbs/issues/49)) ([73fdf98](https://github.com/mattrglobal/jsonld-signatures-bbs/commit/73fdf98a63a00702f71a9df87dff9f9bcf6fe22a))

# [0.5.0](https://github.com/mattrglobal/jsonld-signatures-bbs/compare/v0.4.0...v0.5.0) (2020-05-09)

### Features

- use from key pair method ([#47](https://github.com/mattrglobal/jsonld-signatures-bbs/issues/47)) ([2998710](https://github.com/mattrglobal/jsonld-signatures-bbs/commit/29987106344191819bac3073d913e39927183813))

# [0.4.0](https://github.com/mattrglobal/jsonld-signatures-bbs/compare/v0.3.0...v0.4.0) (2020-05-04)

### Features

- add simple sample ([#41](https://github.com/mattrglobal/jsonld-signatures-bbs/issues/41)) ([8bb49ce](https://github.com/mattrglobal/jsonld-signatures-bbs/commit/8bb49ce2e76bf9be432c8b538bd04b440ec65add))
- update node-bbs-signatures version ([#44](https://github.com/mattrglobal/jsonld-signatures-bbs/issues/44)) ([1a85b83](https://github.com/mattrglobal/jsonld-signatures-bbs/commit/1a85b8326a6fca08184665672a44816cc4ff7bff))

# [0.3.0](https://github.com/mattrglobal/jsonld-signatures-bbs/compare/v0.2.0...v0.3.0) (2020-04-30)

### Bug Fixes

- use expandContext in jsonld.frame operation ([ce5cb3e](https://github.com/mattrglobal/jsonld-signatures-bbs/commit/ce5cb3ec2bd33c747980c8725c191e5866ec31c6))

### Features

- add deriveProof api ([a1024f7](https://github.com/mattrglobal/jsonld-signatures-bbs/commit/a1024f7001236a6e3a12e4c13e90e2f444f8047f))

# [0.2.0](https://github.com/mattrglobal/jsonld-signatures-bbs/compare/v0.1.0...v0.2.0) (2020-04-28)

### Bug Fixes

- linting ([0f4d7e7](https://github.com/mattrglobal/jsonld-signatures-bbs/commit/0f4d7e7ddae9f5d62ce495f58c478ca0873fff90))
- remove un-used lodash dependency ([08f5820](https://github.com/mattrglobal/jsonld-signatures-bbs/commit/08f582058cfe35b3943c55203ed95f7c21113e53))
- update lock file ([74f993e](https://github.com/mattrglobal/jsonld-signatures-bbs/commit/74f993e1b7d404f54cfa442bafead6a607b570c9))

### Features

- add bbs proofs support ([c41b09f](https://github.com/mattrglobal/jsonld-signatures-bbs/commit/c41b09f9865a88ad062db89f90d427f7a6a99690))
- update bbs-signatures dep ([#29](https://github.com/mattrglobal/jsonld-signatures-bbs/issues/29)) ([402a4a7](https://github.com/mattrglobal/jsonld-signatures-bbs/commit/402a4a7fe1936a685bfc828b72de02994a2a4200))
- update proofs api, wip ([b92151e](https://github.com/mattrglobal/jsonld-signatures-bbs/commit/b92151efa52c297683bb3c2371638fd7d8045499))
- use json-ld framing instead of object intersection ([87fa989](https://github.com/mattrglobal/jsonld-signatures-bbs/commit/87fa98955e166226a26f12388838fcbc1910fe20))

# 0.1.0 (2020-04-27)

Initial release
