<!DOCTYPE html>
<html lang="en">
    <head>
        <title>CV</title>
        <link rel="icon" type="image/png" href="/src/assets/favicon.png" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta content="IE=edge" http-equiv="X-UA-Compatible">
        <meta content="width=device-width, initial-scale=1" name="viewport">
        <link rel="stylesheet" type="text/css" href="src/css/info.css">
    </head>
    <body>
        <?php
        
            // LIST OF CVs:
        
            $html = "<h4>List of available CV's:</h4><ul class='cv-style'>";
            $nbFichiers = 0;
            $repertoire = opendir("../../data/");

            while ($fichier = readdir($repertoire))
            {
                if (($fichier == '.') || ($fichier == '..')) continue;
                $html .= '<li><a href="'.$fichier.'">'.$fichier.'</a></li>';
            }
            $html.="</ul>";
            
            
            // ADD new CV:
            
            $html .= "<h4>Add New CV:</h4><ul class='simple-style'>";
            $html .= '<li>Go inside the folder "data"</li>';
            $html .= '<li>Copy/paste "apis mellifera" and rename the new folder to "firstname-lastname"</li>';
            $html .= '<li>In this new folder, edit your information.</li>';
            $html .= "</ul>";
            
            
            // Organization information:
            
            $html .= "<h4>Information organization:</h4><ul class='simple-style'>";
            $html .= '<li>Assets:<ul>';
            $html .=    '<li>Folder containing all your images</li>';
            $html .=    '<li>Your photo: /data/[cv-name]/assets/gfx/photo.png</li>';
            $html .= '</ul></li>';
            $html .= '<li>Data-*.json:<ul>';
            $html .=    '<li>All of your information are contained in these files</li>';
            $html .=    '<li>* Corresponds to a flag, see "Add Language".</li>';
            $html .= '</ul></li>';
            $html .= '<li>Settings.json:<ul>';
            $html .=    '<li>These are the configurations of your CV.</li>';
            $html .=    '<li>For languages: Default language, available language list, selector visibility</li>';
            $html .=    '<li>For skins: Default skin, available skins list, selector visibility</li>';
            $html .= '</ul></li>';
            $html .= "</ul>";
            
            
            // ADD languages:
            
            $html .= "<h4>Add language:</h4><ul class='simple-style'>";
            $html .= '<li>Find your local code in the "List of flags" below (noted in brackets)</li>';
            $html .= '<li>Open file /data/[cv-name]/settings.json</li>';
            $html .= '<li>Add a line in the "languages" array and edit the code for the "id" key</li>';
            $html .= '<li>Change the "defaultLanguage"</li>';
            $html .= '<li>If you don\'t want to see the language selector, switch "languageSelectVisible" to false.</li>';
            $html .= "</ul>";
            
            
            // Redirect this file:
            
            $html .= "<h4>Redirect this page to your CV:</h4><ul class='simple-style'>";
            $html .= '<li>Open .htaccess File</li>';
            $html .= '<li>Uncomment example towards the end of the file:<ul>';
            $html .=    '<li>Remove "/beecv" if you don\'t use sub-folder</li>';
            $html .=    '<li>Replace "apis mellifera" with your folder name</li>';
            $html .= '</ul></li>';
            $html .= "</ul>";
            
            
            // LIST OF Flags:
            
            $flagArray = [
                'aaland (ax)',
                'afghanistan (af)',
                'albania (al)',
                'algeria (dz)',
                'american_samoa (as)',
                'andorra (ad)',
                'angola (ao)',
                'anguilla (ai)',
                'antigua_and_barbuda (ag)',
                'argentina (ar)',
                'armenia (am)',
                'aruba (aw)',
                'australia (au)',
                'austria (at)',
                'azerbaijan (az)',
                'bahamas (bs)',
                'bahrain (bh)',
                'bangladesh (bd)',
                'barbados (bb)',
                'basque (bas)',
                'belarus (by)',
                'belgium (be)',
                'belize (bz)',
                'benin (bj)',
                'bermuda (bm)',
                'bhutan (bt)',
                'bolivia (bo)',
                'bosnia_and_herzegovina (ba)',
                'botswana (bw)',
                'bouvet_island (bv)',
                'brazil (br)',
                'british_indian_ocean_territory (io)',
                'british_virgin_islands (vg)',
                'brunei (bn)',
                'bulgaria (bg)',
                'burkina_faso (bf)',
                'burundi (bi)',
                'cambodia (kh)',
                'cameroon (cm)',
                'canada (ca)',
                'cape_verde (cv)',
                'catalonia (cat)',
                'cayman_islands (ky)',
                'central_african_republic (cf)',
                'chad (td)',
                'chile (cl)',
                'china (cn)',
                'christmas_island (cx)',
                'cocos_islands (cc)',
                'colombia (co)',
                'comoros (km)',
                'congo (cg)',
                'cook_islands (ck)',
                'costa_rica (cr)',
                'cote_d\'ivoire (ci)',
                'croatia (hr)',
                'cuba (cu)',
                'cyprus (cy)',
                'czech_republic (cz)',
                'democratic_republic_of_congo (cd)',
                'denmark (dk)',
                'djibouti (dj)',
                'dominica (dm)',
                'dominican_republic (do)',
                'east_timor (tm)',
                'ecuador (ec)',
                'egypt (eg)',
                'el_salvador (sv)',
                'england (eng)',
                'equatorial_guinea (gq)',
                'eritrea (er)',
                'estonia (ee)',
                'ethiopia (et)',
                'europe (eu)',
                'falkland_islands (fk)',
                'faroe_islands (fo)',
                'federated_states_of_micronesia (fm)',
                'fiji (fj)',
                'finland (fi)',
                'france (fr)',
                'french_guiana (gf)',
                'french_polynesia (pf)',
                'french_southern_and_antarctic_lands (tf)',
                'gabon (ga)',
                'galicia (gal)',
                'gambia (gm)',
                'georgia (ge)',
                'germany (de)',
                'ghana (gh)',
                'gibraltar (gi)',
                'greece (gr)',
                'greenland (gl)',
                'grenada (gd)',
                'guadeloupe (gp)',
                'guam (gu)',
                'guatemala (gt)',
                'guernsey (gg)',
                'guinea (gn)',
                'guinea-bissau (gw)',
                'guyana (gy)',
                'haiti (ht)',
                'heard_island_and_mcdonald_slands (hm)',
                'honduras (hn)',
                'hong_kong (hk)',
                'hungary (hu)',
                'iceland (is)',
                'india (in)',
                'indonesia (id)',
                'iran (ir)',
                'iraq (iq)',
                'ireland (ie)',
                'isle_of_man (im)',
                'israel (il)',
                'italy (it)',
                'jamaica (jm)',
                'japan (jp)',
                'jersey (je)',
                'jordan (jo)',
                'kazakhstan (kz)',
                'kenya (ke)',
                'kiribati (ki)',
                'kuwait (kw)',
                'kyrgyzstan (kg)',
                'laos (la)',
                'latvia (lv)',
                'lebanon (lb)',
                'lesotho (ls)',
                'liberia (lr)',
                'libya (ly)',
                'liechtenstein (li)',
                'lithuania (lt)',
                'luxembourg (lu)',
                'macau (mo)',
                'macedonia (mk)',
                'madagascar (mg)',
                'malawi (mw)',
                'malaysia (my)',
                'maldives (mv)',
                'mali (ml)',
                'malta (mt)',
                'marshall_islands (mh)',
                'martinique (mq)',
                'mauritania (mr)',
                'mauritius (mu)',
                'mayotte (yt)',
                'mexico (mx)',
                'moldova (md)',
                'monaco (mc)',
                'mongolia (mn)',
                'montenegro (me)',
                'montserrat (ms)',
                'morocco (ma)',
                'mozambique (mz)',
                'myanmar (mm)',
                'namibia (na)',
                'nauru (nr)',
                'nepal (np)',
                'netherlands (nl)',
                'netherlands_antilles (an)',
                'new_caledonia (nc)',
                'new_caledonia (nc2)',
                'new_zealand (nz)',
                'nicaragua (ni)',
                'niger (ne)',
                'nigeria (ng)',
                'niue (nu)',
                'norfolk_island (nf)',
                'north_korea (kp)',
                'northern_mariana_islands (mp)',
                'norway (no)',
                'oman (om)',
                'pakistan (pk)',
                'palau (pw)',
                'palestine (ps)',
                'panama (pa)',
                'papua_new_guinea (pg)',
                'paraguay (py)',
                'peru (pe)',
                'philippines (ph)',
                'pitcairn_islands (pn)',
                'poland (pl)',
                'portugal (pt)',
                'puerto_rico (pr)',
                'qatar (qa)',
                'republic_of_china_taiwan (tw)',
                'reunion (re)',
                'romania (ro)',
                'russia (ru)',
                'rwanda (rw)',
                'saint_helena (sh)',
                'saint_kitts_and_nevis (kn)',
                'saint_lucia (lc)',
                'saint_martin (mf)',
                'saint_vincent_and_grenadines (vc)',
                'saint-pierre_and_miquelon (pm)',
                'samoa (ws)',
                'san_marino (sm)',
                'sao_tome_and_principe (st)',
                'saudi_arabia (sa)',
                'scotland (sco)',
                'senegal (sn)',
                'serbia (rs)',
                'serbia_and_montenegro (cs)',
                'seychelles (sc)',
                'sierra_leone (sl)',
                'singapore (sg)',
                'slovakia (sk)',
                'slovenia (si)',
                'solomon_islands (sb)',
                'somalia (so)',
                'south_africa (za)',
                'south_georgia_and_south_sandwich_islands (gs)',
                'south_korea (kr)',
                'spain (es)',
                'sri_lanka (lk)',
                'sudan (sd)',
                'suriname (sr)',
                'svalbard_and_jan_mayen (sj)',
                'swaziland (sz)',
                'sweden (se)',
                'switzerland (ch)',
                'syria (sy)',
                'tajikistan (tj)',
                'tanzania (tz)',
                'thailand (th)',
                'togo (tg)',
                'tokelau (tk)',
                'tonga (to)',
                'trinidad_and_tobago (tt)',
                'tunisia (tn)',
                'turkey (tr)',
                'turkmenistan (tm)',
                'turks_and_caicos_islands (tc)',
                'tuvalu (tv)',
                'uganda (ug)',
                'ukraine (ua)',
                'united_arab_emirates (ae)',
                'united_kingdom (gb)',
                'united_states (us)',
                'united_states_minor_outlying_islands (um)',
                'united_states_virgin_islands (vi)',
                'uruguay (uy)',
                'uzbekistan (uz)',
                'vanuatu (vu)',
                'vatican_city (va)',
                'venezuela (ve)',
                'vietnam (vn)',
                'wales (wal)',
                'wallis_and_futuna (wf)',
                'western_sahara (eh)',
                'yemen (ye)',
                'zambia (zm)',
                'zimbabwe (zw)'
            ];
            
            $html .="<h4>List of flags:</h4><ul class='flag-style'>";
            $flagLength = count($flagArray);
            for ($i = 0; $i < $flagLength; $i++){
                $html .= '<li><span>'.$flagArray[$i].'</span></li>';
            }
            $html.="</ul>";
            
            

            echo '<div id="all">'.$html.'</div>';

        ?>
    </body>
</html>