export type Activity={slug:string;title:string;chapter:number;objectives:string[];summary:string;kind:'Model'|'Build a process'|'Sort & explain';model?:string;steps?:{label:string;why:string}[];groups?:string[];items?:{label:string;group:string;why:string}[];question:string;answer:string;source:string};
export const chapters=['Extension activities','Acellular Life','Bioenergetics','Biological Molecules','Cell Structure & Function','Coordination & Control','Enzymes','Evolution','Reproduction','Support & Movement','Inheritance','Circulation','Immunity','Respiration','Digestion','Homeostasis','Biotechnology'];
export const syllabusUrl='https://pmdc.pk/Documents/Syllabus/Uniform%20Curriculum%20MDCAT-2025%20%20Final%20(26-05-2025).pdf';
export const syllabusNotice='https://pmdc.pk/Documents/Others/Public%20Notice%20Regarding%20MDCAT-2026%20Date%20Announcement.pdf';
const source=(p:string)=>p.startsWith("https://")?p:`https://openstax.org/books/biology-2e/pages/${p}`;
function M(slug:string,title:string,chapter:number,objectives:string,summary:string,page:string,question:string,answer:string):Activity{return{slug,title,chapter,objectives:objectives.split(',').filter(Boolean),summary,source:source(page),kind:'Model',model:slug,question,answer};}
function S(slug:string,title:string,chapter:number,objectives:string,summary:string,page:string,rows:string[],question:string,answer:string):Activity{return{...M(slug,title,chapter,objectives,summary,page,question,answer),model:undefined,kind:'Build a process',steps:rows.map(r=>{const[label,why]=r.split('|');return{label,why};})};}
function C(slug:string,title:string,chapter:number,objectives:string,summary:string,page:string,rows:string[],question:string,answer:string):Activity{const items=rows.map(r=>{const[label,group,why]=r.split('|');return{label,group,why};});return{...M(slug,title,chapter,objectives,summary,page,question,answer),model:undefined,kind:'Sort & explain',items,groups:[...new Set(items.map(r=>r.group))]};}
export const activities:Activity[]=[
M('enzymes','Enzyme saturation',6,'6.1,6.2,6.3','Change substrate and enzyme amounts to discover saturation.','6-5-enzymes','What changes when enzyme amount doubles?','At fixed substrate in this model, rate and Vmax double. Km does not change.'),
M('dihybrid','Dihybrid cross studio',10,'10.1,10.2','Choose any two-locus parents, form gametes and compare expected with sampled offspring.','12-3-laws-of-inheritance','When is the 9:3:3:1 ratio expected?','For AaBb × AaBb with independent assortment, complete dominance at both loci, random fertilisation and equal viability. Samples need not match exactly.'),
M('nerve-impulse','Explore an action potential',5,'5.2,5.3','Scrub a voltage trace and inspect sodium and potassium channel states.','35-2-how-neurons-communicate','Does a stronger stimulus produce a much taller action potential?','Above threshold, action potentials are approximately all-or-none. Stronger stimulation usually changes firing frequency.'),
C('virus-classification','Classify the viruses',1,'1.1','Use genome, envelope and host clues.','21-1-viral-evolution-morphology-and-classification',[
'Two copies of positive-sense RNA and reverse transcriptase|HIV|HIV is an enveloped retrovirus that copies RNA into DNA.',
'Segmented negative-sense RNA with an envelope|Influenza virus|Segmentation can permit reassortment during coinfection.',
'Non-enveloped human virus with double-stranded DNA|Adenovirus|A protein capsid protects its DNA genome.',
'Head and tail; double-stranded DNA; infects E. coli|T4 bacteriophage|Host range and complex morphology distinguish this bacterial virus.'
],'Does an envelope identify the genome type?','No. Envelope presence and genome type are independent classification features.'),
C('hiv-transmission','HIV: separate risk from misconception',1,'1.2','Distinguish transmission routes from ordinary social contact.','21-2-virus-infections-and-hosts',[
'Sharing contaminated injection equipment|Can transmit HIV|Residual blood can contain HIV.',
'Pregnancy, birth or breastfeeding from a person with HIV|Can transmit HIV|Transmission is possible; prevention and treatment greatly reduce risk.',
'Sexual exposure involving infectious body fluids|Can transmit HIV|Risk depends on exposure and effective prevention or treatment.',
'Hugging or sharing a classroom|Does not transmit HIV|HIV is not spread by ordinary social contact.',
'Mosquito bite|Does not transmit HIV|Mosquitoes do not transmit HIV.',
'Advanced immune damage with opportunistic infections|Disease progression|AIDS is an advanced stage of HIV infection.'
],'Can symptoms alone confirm HIV?','No. Infection may be symptom-free. Diagnosis requires an appropriate test; this activity is for learning, not diagnosis.'),
S('lytic-cycle','Build a bacteriophage lytic cycle',1,'1.1','Arrange a T4-style infection from recognition to release.','21-2-virus-infections-and-hosts',[
'Attachment|Phage structures recognise receptors on a susceptible bacterium.',
'Genome entry|Phage DNA enters; the capsid remains outside.',
'Component synthesis|The infected cell produces viral genomes and proteins.',
'Assembly|Genomes are packaged into new particles.',
'Lysis and release|The cell wall is disrupted and progeny phages escape.'
],'Is integration a required step here?','No. Prophage formation belongs to a lysogenic pathway of temperate phages, not every infection.'),
S('glucose-respiration','Follow carbon through respiration',2,'2.1','Build the aerobic route and locate the final electron acceptor.','7-4-oxidative-phosphorylation',[
'Glycolysis|Glucose becomes two pyruvate molecules in the cytosol, producing net ATP and NADH.',
'Pyruvate oxidation|Pyruvate forms acetyl-CoA and releases CO₂ in the mitochondrial matrix.',
'Citric acid cycle|Acetyl carbon is oxidised and electron carriers are reduced.',
'Electron transport|Electron transfer supplies energy for proton pumping.',
'Chemiosmosis and oxygen reduction|Protons drive ATP synthase; oxygen accepts electrons and forms water.'
],'Does glycolysis directly use oxygen?','No. It can continue without oxygen if NAD⁺ is regenerated. Oxygen is the terminal acceptor of the aerobic electron transport chain.'),
C('respiratory-fuels','Route fats and proteins into respiration',2,'2.1','Match breakdown products with their entry into metabolism.','7-6-connections-of-carbohydrate-protein-and-lipid-metabolic-pathways',[
'Glycerol from a triglyceride|Glycolytic intermediate|Glycerol can be converted into a three-carbon intermediate.',
'Two-carbon units from beta oxidation|Acetyl-CoA|Fatty-acid breakdown supplies acetyl-CoA and reduced carriers.',
'Carbon skeletons of different amino acids|Several entry points|They can enter as pyruvate, acetyl-CoA or cycle intermediates.',
'Removed amino groups|Nitrogen disposal|In humans much excess nitrogen is converted to urea.'
],'Do all amino acids enter at the same point?','No. Their different carbon skeletons enter different metabolic routes.'),
C('molecule-families','Identify biological molecule families',3,'3.1,3.2,3.8','Connect composition with biological function.','3-1-synthesis-of-biological-macromolecules',[
'Starch granule|Carbohydrate|Starch is a glucose storage polymer.',
'Antibody|Protein|A folded polypeptide structure permits specific binding.',
'Triglyceride droplet|Lipid|Triglycerides provide concentrated energy storage.',
'Messenger RNA|Nucleic acid|A nucleotide sequence carries coding information.',
'Membrane glycoprotein|Conjugated molecule|Carbohydrate is attached to protein.',
'Membrane glycolipid|Conjugated molecule|Carbohydrate is attached to lipid.'
],'Are all biological organic molecules polymers?','No. Triglycerides are assembled from components but are not repeating-monomer polymers.'),
C('water-properties','Water: explain the observation',3,'3.3','Connect everyday observations with molecular properties.','2-2-water',[
'Water molecules surround dissolved ions|Polarity|Partial charges permit interactions with ions.',
'A lake changes temperature slowly|High specific heat|Considerable energy changes hydrogen-bond interactions before temperature rises greatly.',
'Water molecules pull neighbours along|Cohesion|Hydrogen bonding attracts water molecules to one another.',
'Ice floats|Lower solid density|An open crystal structure makes ice less dense than liquid water.',
'A polymer bond breaks with water as a reactant|Hydrolysis|Water contributes the components needed to split the bond.'
],'Why does water not dissolve every substance?','Nonpolar substances cannot form favourable interactions with water comparable to water–water interactions.'),
C('carbohydrate-roles','Carbohydrates: structure to role',3,'3.4','Distinguish sugars, storage polymers and structural polymers.','3-2-carbohydrates',[
'Glucose|Monosaccharide|One sugar unit can enter respiration.',
'Sucrose|Disaccharide|Glucose and fructose are joined.',
'Lactose|Disaccharide|Galactose and glucose form milk sugar.',
'Starch|Storage polysaccharide|Plants store glucose as starch.',
'Glycogen|Storage polysaccharide|Animals use a highly branched glucose polymer.',
'Cellulose|Structural polysaccharide|Beta-glucose chains strengthen plant cell walls.'
],'Why can humans digest starch but not cellulose?','Human enzymes hydrolyse starch linkages, but humans do not produce cellulase for cellulose’s beta linkages.'),
C('protein-structure','Find the level of protein structure',3,'3.5','Separate sequence, local folding and subunit assembly.','3-4-proteins',[
'Order of amino acids|Primary|Peptide bonds join the amino acids in a particular sequence.',
'Alpha helix|Secondary|Backbone hydrogen bonds stabilise this local fold.',
'Beta pleated sheet|Secondary|Backbone hydrogen bonds stabilise an extended sheet.',
'Overall fold of one polypeptide chain|Tertiary|Side-chain interactions help stabilise the three-dimensional shape.',
'Four chains assembling into haemoglobin|Quaternary|Multiple folded chains associate into a complex.'
],'Must denaturation break peptide bonds?','No. Loss of native folding can destroy function while leaving the primary sequence intact.'),
C('lipid-architecture','Lipid structure and function',3,'3.6','Separate membrane lipids from energy-storage lipids.','3-3-lipids',[
'Glycerol joined to three fatty acids|Triglyceride|Three ester linkages connect the components.',
'Polar phosphate-containing head and two hydrophobic tails|Phospholipid|This amphipathic arrangement favours bilayers.',
'Main framework of a membrane bilayer|Phospholipid|Heads face water and tails turn inward.',
'Long-term energy reserve in adipose tissue|Triglyceride|Neutral fat is stored in droplets.',
'Ester-linked fatty acids in common glycerol-based forms|Both|These common forms share ester linkages.'
],'Why do phospholipids form bilayers?','Polar heads interact with water while nonpolar tails cluster away from it.'),
C('dna-rna','DNA, RNA and information flow',3,'3.7,3.9,3.10','Compare nucleic-acid structure and function.','3-5-nucleic-acids',[
'Deoxyribose and thymine|DNA|DNA normally uses thymine rather than uracil.',
'Ribose and uracil|RNA|RNA normally uses uracil rather than thymine.',
'Antiparallel strands paired A–T and G–C|DNA|Complementary pairing helps stabilise the double helix.',
'mRNA, tRNA and rRNA in translation|RNA|These RNAs have distinct coding, adaptor and ribosomal roles.',
'Sugar-phosphate backbone|Both|Phosphodiester bonds join nucleotides into strands.'
],'Does every gene encode a polypeptide?','Many genes encode polypeptides through RNA; others encode functional RNAs.'),
C('cell-comparison','Plant, animal or both?',4,'4.1','Identify shared machinery and distinctive structures.','4-3-eukaryotic-cells',[
'Cellulose cell wall|Typical plant cell|A wall provides support outside the membrane.',
'Chloroplast in a leaf mesophyll cell|Typical plant cell|Photosynthetic cells contain chloroplasts; not all plant cells do.',
'Large permanent central vacuole|Typical plant cell|It contributes to turgor and storage.',
'Centrioles in a typical centrosome|Typical animal cell|Centrioles help organise the centrosome.',
'Mitochondria|Both|Both perform aerobic respiration.',
'Plasma membrane and ribosomes|Both|Cells need boundaries and protein synthesis.'
],'Do plants stop respiring in daylight?','No. Respiration continues alongside photosynthesis in appropriate cells.'),
C('prokaryote-eukaryote','Compare cell organisation',4,'4.2','Classify evidence from cellular organisation.','4-2-prokaryotic-cells',[
'DNA in a nucleoid without a nuclear envelope|Prokaryotic|The genome is not enclosed in a nucleus.',
'Membrane-bound nucleus|Eukaryotic|The envelope separates nuclear processes from cytoplasm.',
'Mitochondria and Golgi apparatus|Eukaryotic|Membrane-bound organelles compartmentalise reactions.',
'Ribosomes making proteins|Both|Ribosomes are not membrane-bound organelles.',
'Cell membrane and cytoplasm|Both|Both maintain an internal environment.'
],'Does a bacterium lack DNA because it lacks a nucleus?','No. Its DNA is present in the nucleoid.'),
S('protein-export','Trace a secreted protein',4,'4.3','Follow the endomembrane route.','4-4-the-endomembrane-system-and-proteins',[
'Transcription in the nucleus|RNA is produced and processed before export.',
'Translation at rough ER|A signal sequence directs the secretory protein into the ER.',
'Transport vesicle to Golgi|Membrane vesicles move the new protein.',
'Golgi modification and sorting|The Golgi sorts proteins for their destinations.',
'Secretory vesicle fusion|Exocytosis releases the contents outside the cell.'
],'Does this route pass through mitochondria?','No. Mitochondria are not stations in the ER–Golgi secretory pathway.'),
C('chromosomes','Chromosome vocabulary',4,'4.4','Separate DNA packaging, copying and homologous pairing.','10-1-cell-division',[
'DNA associated with packaging proteins|Chromatin|Chromatin can be more or less condensed.',
'Two copies formed by chromosome replication|Sister chromatids|They arise by DNA replication.',
'Maternal and paternal chromosomes with corresponding gene loci|Homologous chromosomes|They can have different alleles.',
'Region at which kinetochores assemble|Centromere|Kinetochores connect chromosomes to spindle microtubules.'
],'Is a duplicated chromosome counted as two before separation?','Conventionally no: it is one chromosome with two chromatids, counted by its centromere.'),
C('neuron-parts','Trace information through a neuron',5,'5.2','Match structure to reception, conduction and output.','35-1-neurons-and-glial-cells',[
'Branched extensions receiving synaptic input|Dendrites|Branching supplies a large receptive surface.',
'Region containing the nucleus|Cell body|The soma maintains the cell and integrates signals.',
'Long process conducting action potentials|Axon|Axonal membrane supports signal propagation.',
'Insulation interrupted by nodes of Ranvier|Myelin sheath|Nodes permit saltatory conduction.',
'Presynaptic region releasing transmitter|Axon terminal|Vesicle fusion releases neurotransmitter.'
],'Are all axons myelinated?','No. Many axons are unmyelinated; myelinated axons have gaps called nodes of Ranvier.'),
S('reflex-arc','Build a withdrawal reflex',5,'5.4,5.5','Place a spinal reflex pathway in functional order.','35-3-the-central-nervous-system',[
'Receptor detects a harmful stimulus|Transduction changes the stimulus into electrical activity.',
'Sensory neuron conducts towards the spinal cord|This is the afferent pathway.',
'Spinal interneuron relays the signal|Withdrawal is a polysynaptic reflex.',
'Motor neuron carries output|This is the efferent pathway.',
'Skeletal muscle contracts|The effector withdraws the body part.'
],'Does every reflex require an interneuron?','No. A monosynaptic stretch reflex has a direct sensory-to-motor synapse; this withdrawal model is polysynaptic.'),
C('receptors','Match stimulus to receptor',5,'5.1','Treat receptors as biological transducers.','36-1-sensory-processes',[
'Light striking the retina|Photoreceptor|Light-sensitive molecules initiate electrical changes.',
'Pressure deforming a skin receptor|Mechanoreceptor|Deformation changes receptor activity.',
'Sound vibrations moving inner-ear hair cells|Mechanoreceptor|Mechanical energy is converted to electrical signals.',
'Odour molecules binding in the nose|Chemoreceptor|Chemical binding initiates a response.',
'Change in skin temperature|Thermoreceptor|Temperature-sensitive structures report warming or cooling.'
],'What unites these different receptor types?','They convert specific stimuli into signals that influence biological activity.'),
C('brain-regions','Locate the brain function',5,'5.6,5.7','Match major functions to brain regions.','35-3-the-central-nervous-system',[
'Conscious perception and voluntary motor planning|Cerebrum|Cortical networks contribute to perception and planning.',
'Movement coordination and error correction|Cerebellum|The cerebellum refines timing, balance and accuracy.',
'Vital respiratory and cardiovascular control|Medulla|Medullary centres support automatic functions.',
'Temperature regulation and endocrine coordination|Hypothalamus|The hypothalamus integrates homeostatic signals.',
'Visual and auditory orienting reflexes|Midbrain|Midbrain circuits contribute to orienting responses.'
],'Does each region work in isolation?','No. These are major associations within interacting networks.'),
S('enzyme-action','Build a catalytic cycle',6,'6.1,6.2','Follow an enzyme from substrate encounter to reuse.','6-5-enzymes',[
'Substrate encounters the active site|Recognition depends on compatible interactions.',
'Enzyme–substrate complex forms|Binding can induce changes in molecular shape.',
'Transition state is stabilised|Catalysis lowers the activation-energy barrier.',
'Products form and leave|Products interact differently from the substrate.',
'Enzyme is available again|The catalyst is regenerated.'
],'Does an enzyme change equilibrium?','No. It speeds approach to equilibrium without changing the overall free-energy difference.'),
M('enzyme-environment','Temperature and pH',6,'6.3','Explore how conditions alter an illustrative enzyme profile.','6-5-enzymes','Does cooling always destroy an enzyme?','No. Cooling generally slows activity reversibly. Excess heat can cause denaturation.'),
M('enzyme-inhibition','Competitive or noncompetitive?',6,'6.4','Change substrate and inhibitor strength to compare rate curves.','6-5-enzymes','Can extra substrate overcome pure noncompetitive inhibition?','No. Pure noncompetitive inhibition lowers Vmax. Competitive inhibition raises apparent Km without changing Vmax.'),
M('natural-selection','Selection over generations',7,'7.3','Adjust relative fitness and track an inherited variant.','19-1-population-evolution','Does need produce an adaptive mutation?','No. Selection acts on heritable variation. Mutation is not directed by an organism’s need.'),
C('evolution-explanations','Evaluate evolutionary explanations',7,'7.1,7.2,7.3','Separate historical ideas, selection and origin-of-life questions.','18-1-understanding-evolution',[
'An organ grows by use and the acquired change is inherited|Lamarck-style explanation|This is the historical inheritance-of-acquired-characters proposal.',
'Heritable variants leave different numbers of offspring|Natural selection|Differential success changes populations across generations.',
'Resistant individuals survive exposure and reproduce|Natural selection|Resistance need not arise in response to exposure.',
'How self-replicating chemistry arose before cells|Origin-of-life question|The origin of life is distinct from later biological evolution.'
],'Does evolution mean an individual transforms to meet its needs?','No. Evolution concerns inherited changes in populations over generations.'),
S('sperm-route','Trace the sperm pathway',8,'8.1','Follow sperm from production to exit.','43-3-human-reproductive-anatomy-and-gametogenesis',[
'Seminiferous tubules|Spermatogenesis occurs in the testes.',
'Epididymis|After passage through testicular ducts, sperm mature and are stored here.',
'Vas deferens|Muscular contractions transport sperm.',
'Ejaculatory duct|The vas deferens joins the seminal-vesicle duct.',
'Urethra|Semen exits through the urethra during ejaculation.'
],'Are sperm produced in the prostate?','No. The prostate contributes fluid; sperm form in seminiferous tubules.'),
S('menstrual-cycle','Build the ovarian hormone cycle',8,'8.1,8.2','Link a simplified non-pregnant cycle to hormonal feedback.','43-4-hormonal-control-of-human-reproduction',[
'Early follicular phase|Falling ovarian hormones permit FSH-supported follicle growth; menstruation overlaps this phase.',
'Dominant follicle grows|Estradiol rises and the endometrium proliferates.',
'Sustained high estradiol triggers an LH surge|Positive feedback promotes the surge near ovulation.',
'Ovulation|The mature follicle releases the oocyte.',
'Corpus luteum activity|Progesterone supports a secretory endometrium.',
'Regression without pregnancy|Ovarian hormones fall and another cycle begins.'
],'Is ovulation always on day 14?','No. Timing varies. Day 14 is an approximation for a typical 28-day cycle.'),
C('reproductive-health','Identify STI causative agents',8,'8.3','Classify organisms and recognise why symptoms are not diagnosis.','https://www.who.int/news-room/fact-sheets/detail/sexually-transmitted-infections-(stis)',[
'Gonorrhoea: Neisseria gonorrhoeae|Bacterial|May cause discharge or painful urination, or be asymptomatic.',
'Syphilis: Treponema pallidum|Bacterial|May start with a painless sore before later systemic disease.',
'Chlamydia: Chlamydia trachomatis|Bacterial|Often asymptomatic; untreated infection can damage reproductive structures.',
'Genital herpes: herpes simplex virus|Viral|Can cause painful lesions; infection may be unrecognised.',
'HIV infection|Viral|HIV damages immune function; symptoms vary with stage.'
],'Does absence of symptoms exclude infection?','No. Appropriate testing is needed; this is an educational classification activity.'),
C('support-tissues','Compare bone, cartilage and muscle',9,'9.1,9.2,9.3','Connect tissue structure with mechanical function.','38-2-bone',[
'Mineralised collagen matrix with osteocytes|Bone|Living bone remodels while providing strong support.',
'Chondrocytes in a resilient matrix|Cartilage|Cartilage provides flexible support with limited direct vascular supply.',
'Long striated multinucleate fibres|Skeletal muscle|These fibres move the skeleton under somatic control.',
'Branched striated cells with intercalated discs|Cardiac muscle|Cell coupling supports coordinated heart contraction.',
'Spindle-shaped cells without visible striations|Smooth muscle|These cells move many hollow organs involuntarily.'
],'Why does cartilage often repair slowly?','It lacks the rich direct blood supply found in bone.'),
M('sarcomere','Slide the filaments',9,'9.4,9.5','Change sarcomere length and inspect A band, I band and overlap.','38-4-muscle-contraction-and-locomotion','Do the filaments themselves shorten?','No. Actin and myosin slide past each other; A band length remains constant.'),
C('sarcomere-structures','Read a sarcomere',9,'9.4','Identify the landmarks used to describe contraction.','38-4-muscle-contraction-and-locomotion',[
'Boundary anchoring thin filaments|Z disc|A sarcomere extends between two neighbouring Z discs.',
'Full length of thick filaments|A band|The A band also includes overlap regions.',
'Thin filaments without thick filaments|I band|This region narrows during contraction.',
'Central thick-only region|H zone|It narrows as thin filaments move inward.',
'Midline alignment of thick filaments|M line|The M line lies at the sarcomere centre.'
],'Why is the A band constant?','Its width is set by thick-filament length, which stays constant as overlap changes.'),
S('crossbridge-cycle','Build the cross-bridge cycle',9,'9.5','Begin with attached myosin after its power stroke.','38-4-muscle-contraction-and-locomotion',[
'ATP binds myosin|Myosin loses affinity for actin and detaches.',
'ATP is hydrolysed|The head is re-cocked with ADP and phosphate retained.',
'Myosin binds exposed actin|Calcium binding to troponin permits site exposure.',
'Phosphate release and power stroke|The head pulls actin.',
'ADP leaves|The head remains attached until another ATP binds.'
],'Why can ATP depletion cause persistent attachment?','Without ATP binding, myosin cannot detach efficiently.'),
C('joints','Classify joints and joint damage',9,'9.6,9.7','Match joint examples and distinguish forms of arthritis.','38-3-joints-and-skeletal-movement',[
'Skull suture|Fibrous joint|Dense connective tissue allows little movement.',
'Pubic symphysis|Cartilaginous joint|Cartilage connects bones and permits limited movement.',
'Elbow|Synovial hinge|It mainly allows flexion and extension.',
'Shoulder|Synovial ball-and-socket|It permits movement in several planes.',
'Degenerative cartilage damage in osteoarthritis|Arthritis|Osteoarthritis involves degeneration.',
'Autoimmune synovial inflammation in rheumatoid disease|Arthritis|Rheumatoid arthritis is inflammatory, not simply wear.'
],'Do all synovial joints have equal movement?','No. Their shapes, ligaments and muscles constrain the available range.'),
M('inheritance','Monohybrid crosses',10,'10.1','Compare all single-locus parent combinations.','12-2-characteristics-and-traits','Must a dominant allele be the most common?','No. Dominance describes expression in a heterozygote, not population frequency.'),
M('linkage','Linkage and recombination',10,'10.3,10.4','Adjust recombination frequency in a dihybrid test cross.','13-1-chromosomal-theory-and-genetic-linkage','Can two-point recombination exceed 50%?','No. At 50%, the result resembles independent assortment. Multiple crossovers can obscure physical distance.'),
C('x-linked','Reason through X-linked inheritance',10,'10.5,10.6,10.7','Cross a carrier mother XᴴXʰ with an unaffected father XᴴY.','12-2-characteristics-and-traits',[
'Maternal Xᴴ + paternal Xᴴ|Unaffected daughter|XᴴXᴴ has two typical alleles.',
'Maternal Xʰ + paternal Xᴴ|Carrier daughter|XᴴXʰ carries the recessive allele; the simplified model treats her as unaffected.',
'Maternal Xᴴ + paternal Y|Unaffected son|XᴴY has the typical allele on its X.',
'Maternal Xʰ + paternal Y|Affected son|XʰY lacks a typical counterpart to the recessive allele.'
],'Affected son among all offspring versus affected among sons?','With equal sex probability: ¼ of offspring are affected sons, while ½ of sons are affected.'),
M('cardiac-cycle','Cardiac cycle explorer',11,'11.1,11.2','Scrub filling, contraction, ejection and valve states.','40-3-mammalian-heart-and-blood-vessels','Are all valves open during ejection?','No. Semilunar valves are open while atrioventricular valves are closed.'),
S('blood-route','Follow a complete circulation',11,'11.1','Start with systemic venous blood returning to the heart.','40-1-overview-of-the-circulatory-system',[
'Venae cavae → right atrium|Systemic venous blood returns to the right side.',
'Right ventricle|Blood crosses the tricuspid valve.',
'Pulmonary artery → lungs|The right ventricle drives pulmonary circulation.',
'Pulmonary veins → left atrium|Oxygenated blood returns from the lungs.',
'Left ventricle|Blood crosses the mitral valve.',
'Aorta → body tissues|The left ventricle drives systemic circulation.'
],'Why is the pulmonary artery an artery?','Arteries carry blood away from the heart, regardless of oxygen content.'),
C('vessels-lymph','Blood vessels and lymphatic return',11,'11.3,11.4','Connect structure, pressure and fluid return.','40-3-mammalian-heart-and-blood-vessels',[
'Thick muscular and elastic wall|Artery|The wall handles pulsatile pressure.',
'Low-pressure return assisted by muscles and valves|Vein|Many limb veins use valves to limit backflow.',
'Thin endothelial exchange barrier|Capillary|A short diffusion distance supports exchange.',
'Recovery of excess interstitial fluid|Lymphatic system|Lymphatic vessels return fluid and protein.',
'Nodes filtering lymph|Lymphatic system|Nodes support immune surveillance.'
],'Are lymph nodes the main filters of blood?','No. Nodes filter lymph; the spleen filters blood.'),
S('immune-response','Build an antibody response',12,'12.1','Follow a simplified T-dependent B-cell response.','42-3-adaptive-immunity',[
'Antigen recognition|A B cell binds an antigen matching its receptor.',
'Activation with helper T-cell signals|Many protein antigens require cognate help for full activation.',
'Clonal expansion|Selected B cells proliferate.',
'Plasma-cell differentiation|Effector cells secrete antibodies.',
'Memory-cell persistence|Some descendants support faster later responses.'
],'Must vaccines contain a live disease-causing organism?','No. They can supply antigens or instructions for antigen production.'),
C('immune-tools','Match the immune effector',12,'12.1','Distinguish neutralisation, cellular killing and memory.','42-3-adaptive-immunity',[
'Binds and neutralises a toxin|Antibody|Binding can prevent the target interaction.',
'Kills a recognised infected host cell|Cytotoxic T cell|These cells recognise antigen presented with MHC I.',
'Signals that coordinate other lymphocytes|Helper T cell|Helper signals support immune responses.',
'Persists and responds rapidly after re-exposure|Memory cell|Memory B and T cells support adaptive immunity.'
],'Do antibodies destroy viruses inside every infected cell?','No. Antibodies mainly act on extracellular targets; cellular immunity handles infected cells.'),
S('airway','Trace air to the alveoli',13,'13.1','Order the conducting pathway and locate gas exchange.','39-1-systems-of-gas-exchange',[
'Nasal cavity|Air is filtered, warmed and humidified.',
'Pharynx and larynx|Air enters the lower respiratory tract.',
'Trachea|Cartilage helps keep the airway open.',
'Bronchi|Branches distribute air into the lungs.',
'Bronchioles|Small airways regulate airflow.',
'Alveoli|Thin walls and nearby capillaries permit exchange.'
],'Why is alveolar surface area important?','Large area supports more diffusion for the same gradient and barrier thickness.'),
C('gas-exchange','Follow respiratory gas gradients',13,'13.2','Predict diffusion directions in lungs and tissues.','39-2-gas-exchange-across-respiratory-surfaces',[
'Alveolar oxygen pressure exceeds arriving blood oxygen pressure|Oxygen into blood|Oxygen diffuses down its partial-pressure gradient.',
'Tissue oxygen pressure is below arterial blood oxygen pressure|Oxygen out of blood|Cellular consumption sustains the gradient.',
'Tissue carbon dioxide pressure exceeds passing blood|Carbon dioxide into blood|Respiration supplies CO₂ to blood.',
'Pulmonary blood carbon dioxide pressure exceeds alveolar air|Carbon dioxide out of blood|CO₂ diffuses into alveoli for exhalation.'
],'Are ventilation and cellular respiration the same?','No. Ventilation moves air; gas exchange moves gases; respiration transfers energy from fuels.'),
C('smoking-effects','Connect smoke exposure to damage',13,'13.3','Match mechanism to consequence.','39-3-breathing',[
'Less effective mucus clearance|Ciliary damage|Damaged cilia clear mucus poorly.',
'Loss of exchange area and elastic recoil|Alveolar damage|Emphysema damages alveolar walls.',
'Carbon monoxide reduces oxygen carriage|Haemoglobin binding|CO binds haemoglobin with high affinity.',
'Carcinogens damage DNA|Cancer risk|Mutations can raise cancer risk.',
'Nicotine increases sympathetic effects|Cardiovascular stimulation|Heart rate and vasoconstriction can increase.'
],'Does nicotine explain all smoke damage?','No. Different components have different harmful mechanisms.'),
S('digestion-route','Follow a meal through the gut',14,'14.1,14.2','Build the route and explain each region’s role.','34-1-digestive-systems',[
'Mouth|Chewing and saliva begin processing; salivary amylase acts on starch.',
'Oesophagus|Peristalsis propels the bolus.',
'Stomach|Mixing, acid and pepsin support protein digestion.',
'Duodenum|Bile and pancreatic secretions enter.',
'Jejunum and ileum|Digestion continues and most nutrients are absorbed.',
'Colon, rectum and anus|Water recovery, storage and elimination complete the route.'
],'Does food pass through liver or pancreas?','No. These accessory organs deliver secretions to the gut.'),
C('digestive-secretions','Match secretion to action',14,'14.2','Separate hydrolysis, emulsification and neutralisation.','34-3-digestive-system-processes',[
'Pancreatic amylase|Carbohydrate digestion|It hydrolyses starch into smaller carbohydrates.',
'Pepsin|Protein digestion|It acts in the acidic stomach.',
'Trypsin|Protein digestion|A pancreatic protease acts after activation in the small intestine.',
'Pancreatic lipase|Lipid digestion|It hydrolyses triglycerides.',
'Bile salts|Emulsification|Bile disperses fat droplets; it is not an enzyme.',
'Pancreatic bicarbonate|Neutralisation|It helps raise the pH of acidic chyme.'
],'Does bile hydrolyse triglycerides?','No. Emulsification increases surface area; lipase performs hydrolysis.'),
S('urinary-route','Follow urine from nephron to outside',15,'15.1','Separate the urine route from the blood route.','41-2-the-kidneys-and-osmoregulatory-organs',[
'Collecting duct|Final water adjustments occur under hormonal influence.',
'Renal calyces and pelvis|Urine drains into the collecting region.',
'Ureter|Peristalsis carries urine towards the bladder.',
'Urinary bladder|A muscular reservoir stores urine.',
'Urethra|Urine leaves the body.'
],'Does the renal vein carry urine?','No. It carries blood. Urine leaves the kidney through the ureter.'),
C('nephron-processes','Filtration, reabsorption or secretion?',15,'15.2,15.3,15.4','Track directions across the nephron.','41-2-the-kidneys-and-osmoregulatory-organs',[
'Small solutes and water move into Bowman’s space|Filtration|Pressure drives flow across a selective barrier.',
'Glucose moves from tubular fluid back to blood|Reabsorption|Useful solutes are recovered.',
'Water leaves tubular fluid for blood|Reabsorption|Water recovery supports fluid balance.',
'Hydrogen ions move into tubular fluid|Secretion|Secretion contributes to acid–base regulation.',
'Some drugs move from peritubular blood into the tubule|Secretion|Transporters add substances to developing urine.'
],'Are the two capillary beds interchangeable?','No. Glomerular capillaries support filtration; peritubular capillaries support reabsorption and secretion.'),
M('negative-feedback','Thermoregulation and negative feedback',15,'15.7','Change a temperature disturbance and inspect the opposing response.','33-3-homeostasis','What makes feedback negative?','The response opposes the original change; negative does not mean harmful.'),
S('adh-water-balance','Respond to dehydration with ADH',15,'15.3','Build the feedback route controlling water recovery.','41-5-hormonal-control-of-osmoregulatory-functions',[
'Blood osmolarity rises|Water loss can concentrate dissolved solutes.',
'Osmoreceptors detect the change|Hypothalamic receptors respond to osmotic conditions.',
'ADH release increases|ADH is made in the hypothalamus and released from the posterior pituitary.',
'Collecting ducts become more water-permeable|Aquaporin insertion increases recovery if an osmotic gradient is present.',
'Less water is lost in urine|Concentrated urine conserves water and reduces the disturbance.'
],'Does ADH mainly increase filtration?','No. Its antidiuretic action increases water reabsorption, especially in collecting ducts.'),
C('kidney-health','Explain kidney problems',15,'15.5,15.6','Distinguish mechanisms and broad treatment principles.','41-2-the-kidneys-and-osmoregulatory-organs',[
'Minerals crystallise in concentrated urine|Stone formation|Urine chemistry and concentration influence crystallisation.',
'A stone obstructs urine flow|Stone formation|Obstruction can raise upstream pressure.',
'Long-standing diabetes damages renal microvasculature|Kidney injury|Persistent disease can impair function.',
'Severe loss of renal blood flow|Kidney injury|Insufficient perfusion can cause acute injury.',
'Dialysis removes wastes and excess fluid|Treatment principle|It replaces some, not all, kidney functions.',
'Lithotripsy fragments selected stones|Treatment principle|Suitability depends on the stone and clinical assessment.'
],'Do all stones need the same treatment?','No. Composition, size, location and obstruction matter. This is conceptual learning, not treatment advice.'),
C('nitrogen-wastes','Compare nitrogenous wastes',15,'15.8','Connect toxicity, water demand and energy cost.','41-4-nitrogenous-wastes',[
'Highly toxic; needs much water for direct elimination|Ammonia|Many aquatic animals diffuse it into surrounding water.',
'Main nitrogenous waste in adult humans|Urea|The liver produces much of it and the kidneys excrete it.',
'Relatively insoluble paste conserving water|Uric acid|Birds and many reptiles use this strategy.',
'Energy-consuming conversion that reduces ammonia toxicity|Urea|Conversion permits safer transport of nitrogen.'
],'Is urea mainly manufactured in the kidney?','No. The liver mainly synthesises urea; the kidneys mainly excrete it.'),
S('recombinant-insulin','Build recombinant protein production',16,'16.3','Follow a simplified therapeutic-protein production route.','17-1-biotechnology',[
'Obtain a suitable coding sequence|Bacterial expression requires an intron-free sequence and appropriate design.',
'Insert the sequence into an expression vector|Regulatory sequences support expression.',
'Introduce the vector into host cells|Cells receiving the construct are identified.',
'Grow selected cells and express the protein|Controlled culture supports production.',
'Purify and assess the product|Identity, purity and activity must be checked.'
],'Can bacteria always express an unmodified human genomic gene?','No. They do not normally remove human introns, and suitable expression and processing are needed.'),
C('biotech-diagnosis','Choose a molecular diagnostic tool',16,'16.2','Separate sequence recognition from antigen recognition.','17-1-biotechnology',[
'Binds a complementary nucleic-acid sequence|DNA / RNA probe|Hybridisation depends on base pairing.',
'Detects a chosen pathogen sequence|DNA / RNA probe|A designed sequence identifies target nucleic acid.',
'Binds a specific antigen epitope|Monoclonal antibody|Clone-derived antibodies have defined specificity.',
'Captures antigen in an immunoassay|Monoclonal antibody|Binding can be connected to a measurable signal.'
],'Does a probe recognise protein by base pairing?','No. Base pairing applies to nucleic acids; antibodies recognise epitopes.'),
C('vaccine-platforms','Compare vaccine approaches',16,'16.1','Identify what is supplied to stimulate immunity.','42-4-disruptions-in-the-immune-system',[
'Pathogen rendered unable to replicate|Inactivated|Its components can still present antigens.',
'Selected purified antigen made using biotechnology|Subunit / recombinant|Only selected components are supplied.',
'Instructions translated by host cells into antigen|mRNA|Delivered RNA supports temporary antigen production.',
'Weakened organism with limited replication|Live attenuated|It can stimulate immunity in appropriate recipients.'
],'Is vaccination transfer of ready-made antibodies?','No. Vaccination stimulates active immunity; ready-made antibodies provide passive immunity.'),
M('osmosis','Osmosis across a membrane',0,'','Predict water movement as the outside solution changes.','5-2-passive-transport','At equilibrium, do molecules stop crossing?','No. Water continues crossing in both directions at equal rates.'),
M('diffusion','Diffusion and cell size',0,'','Change geometry and diffusion distance to inspect exchange.','4-2-prokaryotic-cells','What happens to surface-area-to-volume ratio as a cube grows?','It decreases: SA:V = 6/L. Exchange surface is smaller relative to volume.'),
M('photosynthesis','Photosynthesis: the limiting factor',0,'','Adjust light and carbon dioxide in a simplified model.','8-3-using-light-energy-to-make-organic-molecules','Why can extra light fail to increase rate?','Another factor, such as carbon dioxide availability, can limit photosynthesis.'),
C('membrane-transport','Choose a membrane transport route',0,'','Use cargo, gradient and energy clues.','5-3-active-transport',[
'Oxygen crosses the lipid bilayer down its gradient|Simple diffusion|Small nonpolar molecules can cross directly.',
'Glucose moves down its gradient through a carrier|Facilitated diffusion|A protein assists movement without driving it uphill.',
'Na⁺/K⁺ pump maintains ion gradients using ATP|Active transport|Energy drives transport against electrochemical gradients.',
'A cell engulfs a large particle|Vesicle transport|Endocytosis internalises material.',
'A vesicle releases protein outside the cell|Vesicle transport|Exocytosis merges vesicle and plasma membranes.'
],'Does every transport protein require ATP?','No. Channels and passive carriers can support movement down gradients.'),
];
