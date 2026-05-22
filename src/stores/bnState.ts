import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getBridgeInstance, setBridgeInstance, clearBridgeInstance } from '@/utils/bridgeInstance'
import { BNWorkspaceBridge } from '@/utils/bnWorkspaceBridge'
import { snackbar } from 'mdui/functions/snackbar.js'
import { useAuthStore } from './auth'
import { useDomStore } from './dom'

interface SaveDataResult {
  xml: Record<string, any>
  block_count: number
  block_count_visible_only: number
  variable_dict: Record<string, any>
  broadcast_dict: Record<string, any>
  split_options: Record<string, any>
  procedure_dict: Record<string, any>
  toolbox: {
    devices: any[]
  }
}

export const useBNStateStore = defineStore('bnState', () => {
  const authStore = useAuthStore()
  const domStore = useDomStore()
  const isPlay = ref(false)
  const isPad = ref(true)
  const isZipWork = ref(false)
  const defaultBCMJson = ref({
    actors: {
      actors_dict: {
        '0a67a969-430b-4f03-b35a-a91ef4c917b9': {
          blocksXML:
            '\u003cblock type\u003d"on_phone_shake" id\u003d"Ws\u003d8x)OPfPo3Zk`}l)vk" visible\u003d"visible" inline\u003d"true" x\u003d"109" y\u003d"133"\u003e\u003cnext\u003e\u003cblock type\u003d"self_broadcast" id\u003d"FtpGvNZ}`myW1VH)*1x\u003d" visible\u003d"visible" inline\u003d"true"\u003e\u003cfield name\u003d"message"\u003e94fa763a-519f-4c92-bd5f-939e2bca70a1\u003c/field\u003e\u003cnext\u003e\u003cblock type\u003d"repeat_n_times" id\u003d"Z]IQx#`bRc`Hbd#ybX!o" visible\u003d"visible" inline\u003d"true"\u003e\u003cvalue name\u003d"times"\u003e\u003cshadow type\u003d"math_number" id\u003d"tTAv^!hGtP_UxhJ7Zzb!" visible\u003d"visible"\u003e\u003cfield constraints\u003d"-Infinity,Infinity,0," name\u003d"NUM"\u003e2\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cstatement name\u003d"DO"\u003e\u003cblock type\u003d"repeat_n_times" id\u003d"joczumG{_;(Whg(E0`3-" visible\u003d"visible" inline\u003d"true"\u003e\u003cvalue name\u003d"times"\u003e\u003cshadow type\u003d"math_number" id\u003d"aRhE@YaQ6U0_I]3MX`$C" visible\u003d"visible"\u003e\u003cfield constraints\u003d"-Infinity,Infinity,0," name\u003d"NUM"\u003e12\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cstatement name\u003d"DO"\u003e\u003cblock type\u003d"self_rotate" id\u003d"5RKo|y![Ojf?17[(n~M\u003d" visible\u003d"visible" inline\u003d"true"\u003e\u003cvalue name\u003d"degrees"\u003e\u003cshadow type\u003d"math_number" id\u003d"XBn^{o:QgMkL6\u003d2M_0b/" visible\u003d"visible"\u003e\u003cfield constraints\u003d"-Infinity,Infinity,0," name\u003d"NUM"\u003e-1\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003c/block\u003e\u003c/statement\u003e\u003cnext\u003e\u003cblock type\u003d"repeat_n_times" id\u003d"Ka00).[PuX)Vwvg.XWk9" visible\u003d"visible" inline\u003d"true"\u003e\u003cvalue name\u003d"times"\u003e\u003cshadow type\u003d"math_number" id\u003d"$fK3uz,1U!5$fsV^|8rE" visible\u003d"visible"\u003e\u003cfield constraints\u003d"-Infinity,Infinity,0," name\u003d"NUM"\u003e12\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cstatement name\u003d"DO"\u003e\u003cblock type\u003d"self_rotate" id\u003d"c{9XIl@L4BrRQ6Gs4EX;" visible\u003d"visible" inline\u003d"true"\u003e\u003cvalue name\u003d"degrees"\u003e\u003cshadow type\u003d"math_number" id\u003d"IokjiL@r./OYY@VX]aqc" visible\u003d"visible"\u003e\u003cfield constraints\u003d"-Infinity,Infinity,0," name\u003d"NUM"\u003e1\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003c/block\u003e\u003c/statement\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003c/statement\u003e\u003cnext\u003e\u003cblock type\u003d"self_broadcast" id\u003d"|!qn@8P65{0-A!@/*aCR" visible\u003d"visible" inline\u003d"true"\u003e\u003cfield name\u003d"message"\u003e5cd7cbc1-805d-4413-af31-188ca6a3c3b8\u003c/field\u003e\u003cnext last_next_in_stack\u003d"true"\u003e\u003c/next\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003cblock type\u003d"cloud_variables_set" id\u003d"jPsF32trlOYM6gGyNdXR" visible\u003d"visible" inline\u003d"true" x\u003d"290" y\u003d"130"\u003e\u003cfield name\u003d"VAR"\u003e?\u003c/field\u003e\u003cvalue name\u003d"VALUE"\u003e\u003cshadow type\u003d"math_number" id\u003d"dRiZoKbbsiG87JVwwm42" visible\u003d"visible"\u003e\u003cfield constraints\u003d"-Infinity,Infinity,0," allow_text\u003d"true" name\u003d"NUM"\u003e0\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cnext last_next_in_stack\u003d"true"\u003e\u003c/next\u003e\u003c/block\u003e',
          current_style_id: '10b9c4b1-bf08-42f1-942c-d3a7b0cb9e16',
          hidden_in_edit: false,
          id: '0a67a969-430b-4f03-b35a-a91ef4c917b9',
          locked: false,
          name: '大黄鸡扭蛋机',
          rotation: 0.08726646259971647,
          scale: 100.0,
          styles: ['10b9c4b1-bf08-42f1-942c-d3a7b0cb9e16'],
          visible: true,
          x: 169.0,
          y: 105.0,
        },
        'af434f04-17b3-4215-a8fd-7a090f34da6e': {
          blocksXML:
            '\u003cvariables\u003e\u003cvariable type\u003d"" id\u003d"~oV9FcZKYl},wh\u003dP$auY"\u003e?\u003c/variable\u003e\u003c/variables\u003e\u003cblock type\u003d"self_listen" id\u003d"?.{kRxO$fa0XM:kLyWz(" inline\u003d"true" x\u003d"79" y\u003d"101"\u003e\u003cfield name\u003d"message"\u003e94fa763a-519f-4c92-bd5f-939e2bca70a1\u003c/field\u003e\u003cstatement name\u003d"DO"\u003e\u003cblock type\u003d"self_set_position_y" id\u003d"qXzenj6ys{:)?#8Fqv~H" inline\u003d"true"\u003e\u003cvalue name\u003d"value"\u003e\u003cshadow type\u003d"math_number" id\u003d"8ClSAE!G05!-0O\u003da};3e"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e0\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003c/block\u003e\u003c/statement\u003e\u003c/block\u003e\u003cblock type\u003d"self_listen" id\u003d"oyCMGe(N@::Vfag,BPZM" inline\u003d"true" x\u003d"77" y\u003d"219"\u003e\u003cfield name\u003d"message"\u003e5cd7cbc1-805d-4413-af31-188ca6a3c3b8\u003c/field\u003e\u003cstatement name\u003d"DO"\u003e\u003cblock type\u003d"wait" id\u003d"KLWY6Lk^D!s+]?X]A~|;" inline\u003d"true"\u003e\u003cvalue name\u003d"time"\u003e\u003cshadow type\u003d"math_number" id\u003d"N8NR6|E}@N__m@hMpc|3"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e0.2\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cnext\u003e\u003cblock type\u003d"variables_set" id\u003d"K1_]1[;0kz5-hh|mOpE$" inline\u003d"true"\u003e\u003cfield name\u003d"VAR"\u003e56d58ca6-703b-40a3-b88c-5e90b229c1b4\u003c/field\u003e\u003cvalue name\u003d"VALUE"\u003e\u003cshadow type\u003d"math_number" id\u003d"vu_2MdO^~SX@BA#i1\u003dGk"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e0\u003c/field\u003e\u003c/shadow\u003e\u003cblock type\u003d"random" id\u003d"nxcZg6w`-O|[Qp]q!?Z$" inline\u003d"true"\u003e\u003cvalue name\u003d"a"\u003e\u003cshadow type\u003d"math_number" id\u003d"v4av(yTpVOXn4JfB(OxL"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e1\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d"b"\u003e\u003cshadow type\u003d"math_number" id\u003d"@r3b1,$Jv$^)*S2coa,c"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e7\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003c/block\u003e\u003c/value\u003e\u003cnext\u003e\u003cblock type\u003d"set_costume_by_index" id\u003d"V-Dk{Oy8izRdzr!1#!+e" inline\u003d"true"\u003e\u003cvalue name\u003d"index"\u003e\u003cshadow type\u003d"styles_index_get" id\u003d"~y(dn(Pc0npGl4}UFmh3" inline\u003d"true"\u003e\u003cfield name\u003d"index"\u003e1\u003c/field\u003e\u003c/shadow\u003e\u003cblock type\u003d"variables_get" id\u003d"ZGJ8!D{$c?W+3*6sdfe+" inline\u003d"true"\u003e\u003cfield name\u003d"VAR"\u003e56d58ca6-703b-40a3-b88c-5e90b229c1b4\u003c/field\u003e\u003c/block\u003e\u003c/value\u003e\u003cnext\u003e\u003cblock type\u003d"self_glide_position_y" id\u003d"q_a{.s78bT|f62-~`v,p" inline\u003d"true"\u003e\u003cvalue name\u003d"time"\u003e\u003cshadow type\u003d"math_number" id\u003d"8Vib,-oQA2/Ti,Q~E6X+"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e0.5\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d"value"\u003e\u003cshadow type\u003d"math_number" id\u003d"\u003d:noUYf46sYw@u9hj.a@"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e-300\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cnext\u003e\u003cblock type\u003d"wait" id\u003d"tHz1bxOI-$VNuYC]Mnr5" inline\u003d"true"\u003e\u003cvalue name\u003d"time"\u003e\u003cshadow type\u003d"math_number" id\u003d"_T)JD#~G7hB\u003d]g5SGKKx"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e0.5\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cnext\u003e\u003cblock type\u003d"controls_if_no_else" id\u003d"*e6PGEN?Pof5L2L_zNA-" inline\u003d"true"\u003e\u003cvalue name\u003d"IF0"\u003e\u003cempty type\u003d"logic_empty" id\u003d"p.,LD0EwTgd,f*m;YuXt" editable\u003d"false"\u003e\u003cfield name\u003d"BOOL"/\u003e\u003c/empty\u003e\u003cblock type\u003d"logic_compare" id\u003d"}d+z^$jSttek#Ft_S50Y" inline\u003d"true"\u003e\u003cfield name\u003d"OP"\u003eEQ\u003c/field\u003e\u003cvalue name\u003d"A"\u003e\u003cshadow type\u003d"math_number" id\u003d"F5Ox1K+rlE$?2j)^VI~a"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e0\u003c/field\u003e\u003c/shadow\u003e\u003cblock type\u003d"variables_get" id\u003d"^{P]0)9d;ox*n+,Zz};[" inline\u003d"true"\u003e\u003cfield name\u003d"VAR"\u003e56d58ca6-703b-40a3-b88c-5e90b229c1b4\u003c/field\u003e\u003c/block\u003e\u003c/value\u003e\u003cvalue name\u003d"B"\u003e\u003cshadow type\u003d"math_number" id\u003d"Xd*i|HO}a@^^BI3I3A0["\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e1\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003c/block\u003e\u003c/value\u003e\u003cstatement name\u003d"DO0"\u003e\u003cblock type\u003d"show_stage_dialog" id\u003d"fRAt1}-GA@,}IK[\u003d!v){" inline\u003d"true"\u003e\u003cfield name\u003d"sprite"\u003e__self\u003c/field\u003e\u003cvalue name\u003d"text"\u003e\u003cshadow type\u003d"text" id\u003d"*8ohw:U2X/UuKrZUz~Dj"\u003e\u003cfield name\u003d"TEXT"\u003e事件类积木控制积木的触发事件\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003c/block\u003e\u003c/statement\u003e\u003cnext\u003e\u003cblock type\u003d"controls_if_no_else" id\u003d"T+_po8~T!NU+Mo*NHiz}" inline\u003d"true"\u003e\u003cvalue name\u003d"IF0"\u003e\u003cempty type\u003d"logic_empty" id\u003d"[]\u003d~m.ssQjim!KX(IlxY" editable\u003d"false"\u003e\u003cfield name\u003d"BOOL"/\u003e\u003c/empty\u003e\u003cblock type\u003d"logic_compare" id\u003d"ow6K9}Uy]?hV^[rjy1M{" inline\u003d"true"\u003e\u003cfield name\u003d"OP"\u003eEQ\u003c/field\u003e\u003cvalue name\u003d"A"\u003e\u003cshadow type\u003d"math_number" id\u003d"ApJWxgB!A$N~4RSYm_:9"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e0\u003c/field\u003e\u003c/shadow\u003e\u003cblock type\u003d"variables_get" id\u003d"M$@71-OdpSSW:i6AQFug" inline\u003d"true"\u003e\u003cfield name\u003d"VAR"\u003e56d58ca6-703b-40a3-b88c-5e90b229c1b4\u003c/field\u003e\u003c/block\u003e\u003c/value\u003e\u003cvalue name\u003d"B"\u003e\u003cshadow type\u003d"math_number" id\u003d"IBS^i*XpqfUv:#vbT~o_"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e2\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003c/block\u003e\u003c/value\u003e\u003cstatement name\u003d"DO0"\u003e\u003cblock type\u003d"show_stage_dialog" id\u003d"_Noqz+wTe#rBH{;I-~3S" inline\u003d"true"\u003e\u003cfield name\u003d"sprite"\u003e__self\u003c/field\u003e\u003cvalue name\u003d"text"\u003e\u003cshadow type\u003d"text" id\u003d"l);Z@/g2qMWM!m8)YKVj"\u003e\u003cfield name\u003d"TEXT"\u003e声音类积木控制音乐音效的播放\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003c/block\u003e\u003c/statement\u003e\u003cnext\u003e\u003cblock type\u003d"controls_if_no_else" id\u003d"w@vf?A/Z@1U4z$IX60K1" inline\u003d"true"\u003e\u003cvalue name\u003d"IF0"\u003e\u003cempty type\u003d"logic_empty" id\u003d"[]\u003d~m.ssQjim!KX(IlxY" editable\u003d"false"\u003e\u003cfield name\u003d"BOOL"/\u003e\u003c/empty\u003e\u003cblock type\u003d"logic_compare" id\u003d")UMnGgvsG./#,dy4JWAi" inline\u003d"true"\u003e\u003cfield name\u003d"OP"\u003eEQ\u003c/field\u003e\u003cvalue name\u003d"A"\u003e\u003cshadow type\u003d"math_number" id\u003d"ApJWxgB!A$N~4RSYm_:9"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e0\u003c/field\u003e\u003c/shadow\u003e\u003cblock type\u003d"variables_get" id\u003d"Z*f,Ge/nVf5v4aLu$XH:" inline\u003d"true"\u003e\u003cfield name\u003d"VAR"\u003e56d58ca6-703b-40a3-b88c-5e90b229c1b4\u003c/field\u003e\u003c/block\u003e\u003c/value\u003e\u003cvalue name\u003d"B"\u003e\u003cshadow type\u003d"math_number" id\u003d"BhCi(]ipafc-,jxN;10U"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e3\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003c/block\u003e\u003c/value\u003e\u003cstatement name\u003d"DO0"\u003e\u003cblock type\u003d"show_stage_dialog" id\u003d"Ii@S;6?\u003dO{YDJ0230bDf" inline\u003d"true"\u003e\u003cfield name\u003d"sprite"\u003e__self\u003c/field\u003e\u003cvalue name\u003d"text"\u003e\u003cshadow type\u003d"text" id\u003d"~oL/HYzkm^@q,T{_2$A{"\u003e\u003cfield name\u003d"TEXT"\u003e动作类积木让角色做各种运动\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003c/block\u003e\u003c/statement\u003e\u003cnext\u003e\u003cblock type\u003d"controls_if_no_else" id\u003d"ypo;ct*Xdu7cIcZkM)`B" inline\u003d"true"\u003e\u003cvalue name\u003d"IF0"\u003e\u003cempty type\u003d"logic_empty" id\u003d"6*BgXk~O$9d6dJq}jRSh" editable\u003d"false"\u003e\u003cfield name\u003d"BOOL"/\u003e\u003c/empty\u003e\u003cblock type\u003d"logic_compare" id\u003d"s9tte:f77{M8}`$!pM-;" inline\u003d"true"\u003e\u003cfield name\u003d"OP"\u003eEQ\u003c/field\u003e\u003cvalue name\u003d"A"\u003e\u003cshadow type\u003d"math_number" id\u003d"okkt8wXdIe$`n-R?jqcj"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e0\u003c/field\u003e\u003c/shadow\u003e\u003cblock type\u003d"variables_get" id\u003d"z1#K_cOZWR-7E*bS8Tmu" inline\u003d"true"\u003e\u003cfield name\u003d"VAR"\u003e56d58ca6-703b-40a3-b88c-5e90b229c1b4\u003c/field\u003e\u003c/block\u003e\u003c/value\u003e\u003cvalue name\u003d"B"\u003e\u003cshadow type\u003d"math_number" id\u003d"I|dcQJ3jdOG@K;EPYzvj"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e4\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003c/block\u003e\u003c/value\u003e\u003cstatement name\u003d"DO0"\u003e\u003cblock type\u003d"show_stage_dialog" id\u003d"prXs6q?_*`f6e+-h~l:/" inline\u003d"true"\u003e\u003cfield name\u003d"sprite"\u003e__self\u003c/field\u003e\u003cvalue name\u003d"text"\u003e\u003cshadow type\u003d"text" id\u003d"ZNT1KDjYplH4wV0kXU^P"\u003e\u003cfield name\u003d"TEXT"\u003e数学类积木可以附加运算关系\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003c/block\u003e\u003c/statement\u003e\u003cnext\u003e\u003cblock type\u003d"controls_if_no_else" id\u003d"`F_^\u003d13FVC_XQ:KL5W`b" inline\u003d"true"\u003e\u003cvalue name\u003d"IF0"\u003e\u003cempty type\u003d"logic_empty" id\u003d"moVMlD(Aeee#^Cll`1cD" editable\u003d"false"\u003e\u003cfield name\u003d"BOOL"/\u003e\u003c/empty\u003e\u003cblock type\u003d"logic_compare" id\u003d"T_-SXPn*,HoMJX|fgvSx" inline\u003d"true"\u003e\u003cfield name\u003d"OP"\u003eEQ\u003c/field\u003e\u003cvalue name\u003d"A"\u003e\u003cshadow type\u003d"math_number" id\u003d"{$pGE$u_LF1q`tWK1)FY"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e0\u003c/field\u003e\u003c/shadow\u003e\u003cblock type\u003d"variables_get" id\u003d"HN/@r3Clq|bXxVHbU[]t" inline\u003d"true"\u003e\u003cfield name\u003d"VAR"\u003e56d58ca6-703b-40a3-b88c-5e90b229c1b4\u003c/field\u003e\u003c/block\u003e\u003c/value\u003e\u003cvalue name\u003d"B"\u003e\u003cshadow type\u003d"math_number" id\u003d"NW?lp9vkfvG`e~o_M{zL"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e5\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003c/block\u003e\u003c/value\u003e\u003cstatement name\u003d"DO0"\u003e\u003cblock type\u003d"show_stage_dialog" id\u003d"kB]`3GUn`:+,3.04sOGK" inline\u003d"true"\u003e\u003cfield name\u003d"sprite"\u003e__self\u003c/field\u003e\u003cvalue name\u003d"text"\u003e\u003cshadow type\u003d"text" id\u003d"b;P#Yq991B}0l~;L,e\u003dA"\u003e\u003cfield name\u003d"TEXT"\u003e控制类积木可以控制积木的运行顺序\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003c/block\u003e\u003c/statement\u003e\u003cnext\u003e\u003cblock type\u003d"controls_if_no_else" id\u003d"VjyQo`_h+PIt5D`Ts$Sj" inline\u003d"true"\u003e\u003cvalue name\u003d"IF0"\u003e\u003cempty type\u003d"logic_empty" id\u003d"moVMlD(Aeee#^Cll`1cD" editable\u003d"false"\u003e\u003cfield name\u003d"BOOL"/\u003e\u003c/empty\u003e\u003cblock type\u003d"logic_compare" id\u003d"c-9y?zD3l-?_V6?_(g\u003d?" inline\u003d"true"\u003e\u003cfield name\u003d"OP"\u003eEQ\u003c/field\u003e\u003cvalue name\u003d"A"\u003e\u003cshadow type\u003d"math_number" id\u003d"{$pGE$u_LF1q`tWK1)FY"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e0\u003c/field\u003e\u003c/shadow\u003e\u003cblock type\u003d"variables_get" id\u003d"cBztdC?Bk(ybtHd,lv30" inline\u003d"true"\u003e\u003cfield name\u003d"VAR"\u003e56d58ca6-703b-40a3-b88c-5e90b229c1b4\u003c/field\u003e\u003c/block\u003e\u003c/value\u003e\u003cvalue name\u003d"B"\u003e\u003cshadow type\u003d"math_number" id\u003d"D@$R^u2v@Z{+t7M!xa(/"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e6\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003c/block\u003e\u003c/value\u003e\u003cstatement name\u003d"DO0"\u003e\u003cblock type\u003d"show_stage_dialog" id\u003d"y~v5-;)g?e8n8?-yeXt@" inline\u003d"true"\u003e\u003cfield name\u003d"sprite"\u003e__self\u003c/field\u003e\u003cvalue name\u003d"text"\u003e\u003cshadow type\u003d"text" id\u003d"y(O_1@$gl`uoK^L4(p9."\u003e\u003cfield name\u003d"TEXT"\u003e外观类积木可以改变角色的视觉效果\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003c/block\u003e\u003c/statement\u003e\u003cnext\u003e\u003cblock type\u003d"controls_if_no_else" id\u003d"Cd[nFPA0+Y_`2(@:-Uot" inline\u003d"true"\u003e\u003cvalue name\u003d"IF0"\u003e\u003cempty type\u003d"logic_empty" id\u003d"LeKcVWEP3If[km6}op5+" editable\u003d"false"\u003e\u003cfield name\u003d"BOOL"/\u003e\u003c/empty\u003e\u003cblock type\u003d"logic_compare" id\u003d"Tmu_\u003dV5BA~R@X/8.p9ER" inline\u003d"true"\u003e\u003cfield name\u003d"OP"\u003eEQ\u003c/field\u003e\u003cvalue name\u003d"A"\u003e\u003cshadow type\u003d"math_number" id\u003d"yj+/dsYwx5:/)3VeEZa7"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e0\u003c/field\u003e\u003c/shadow\u003e\u003cblock type\u003d"variables_get" id\u003d"dY?[+_at76zgc?-XXl9s" inline\u003d"true"\u003e\u003cfield name\u003d"VAR"\u003e56d58ca6-703b-40a3-b88c-5e90b229c1b4\u003c/field\u003e\u003c/block\u003e\u003c/value\u003e\u003cvalue name\u003d"B"\u003e\u003cshadow type\u003d"math_number" id\u003d"|+Xh]KiBf^ZZGA/-`zx7"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e7\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003c/block\u003e\u003c/value\u003e\u003cstatement name\u003d"DO0"\u003e\u003cblock type\u003d"show_stage_dialog" id\u003d"tA!nNf,_e}\u003d,L1]BkUnD" inline\u003d"true"\u003e\u003cfield name\u003d"sprite"\u003e__self\u003c/field\u003e\u003cvalue name\u003d"text"\u003e\u003cshadow type\u003d"text" id\u003d"@[d7`O5XJoj\u003dnz/l,`Oo"\u003e\u003cfield name\u003d"TEXT"\u003e画笔类积木可以让你随意涂鸦\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003c/block\u003e\u003c/statement\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003c/statement\u003e\u003c/block\u003e',
          current_style_id: 'a83eccae-0233-423a-a8f0-1abf0c1011fd',
          hidden_in_edit: false,
          id: 'af434f04-17b3-4215-a8fd-7a090f34da6e',
          locked: false,
          name: '积木星球',
          rotation: -0.0,
          scale: 157.1637312121685,
          styles: [
            'a83eccae-0233-423a-a8f0-1abf0c1011fd',
            '72760ecb-9590-45d0-9e9f-d42c3babf8e8',
            'd867480b-44ce-472f-80cb-4538ac827d65',
            '55bbbeeb-f091-4eca-a031-7eca81a375fc',
            '6e2df355-719a-409c-b814-62d12e190cde',
            '83a0bb66-147b-4ca0-abb3-037e94a5b14d',
            '6ce3e778-37d7-4b64-b298-291e73f34855',
          ],
          visible: true,
          x: 0.0,
          y: 0.0,
        },
        '850025f4-c3f4-4cda-8e17-191b5feb521f': {
          blocksXML:
            '\u003cvariables\u003e\u003cvariable type\u003d"" id\u003d"Cp\u003dkIbFh;Kz*pwq-nhu6"\u003e?\u003c/variable\u003e\u003c/variables\u003e\u003cblock type\u003d"start_on_click" id\u003d"|lNyySJbJeIV2(?phrCZ" inline\u003d"true" x\u003d"57" y\u003d"80"\u003e\u003cnext\u003e\u003cblock type\u003d"self_set_effect_2" id\u003d"S_GTRkaj+fSM$_+:]?M/" inline\u003d"true"\u003e\u003cfield name\u003d"scope"\u003e1\u003c/field\u003e\u003cvalue name\u003d"val"\u003e\u003cshadow type\u003d"math_number" id\u003d"qKgAQIN,VPSK+lIr4Cfg"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e100\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003cblock type\u003d"self_listen" id\u003d"+{)b}.??fjGk)~~v6v9v" inline\u003d"true" x\u003d"56" y\u003d"192"\u003e\u003cfield name\u003d"message"\u003e94fa763a-519f-4c92-bd5f-939e2bca70a1\u003c/field\u003e\u003cstatement name\u003d"DO"\u003e\u003cblock type\u003d"self_set_effect_2" id\u003d"WnXn][;L:s.ryIlCJ_FE" inline\u003d"true"\u003e\u003cfield name\u003d"scope"\u003e1\u003c/field\u003e\u003cvalue name\u003d"val"\u003e\u003cshadow type\u003d"math_number" id\u003d"_k^``Z*lUP9/#WM4jFg\u003d"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e100\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003c/block\u003e\u003c/statement\u003e\u003c/block\u003e\u003cblock type\u003d"self_listen" id\u003d"XN@]:ZVjm)`e:Cag|0WS" inline\u003d"true" x\u003d"71" y\u003d"303"\u003e\u003cfield name\u003d"message"\u003e5cd7cbc1-805d-4413-af31-188ca6a3c3b8\u003c/field\u003e\u003cstatement name\u003d"DO"\u003e\u003cblock type\u003d"wait" id\u003d"YHc(GN_N@YgJ!9c^b]eB" inline\u003d"true"\u003e\u003cvalue name\u003d"time"\u003e\u003cshadow type\u003d"math_number" id\u003d"VW.t:Ee,tI8*R*Mna+.t"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e0.2\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cnext\u003e\u003cblock type\u003d"repeat_n_times" id\u003d"TH9#c\u003d)CJrN/BC6p5jC0" inline\u003d"true"\u003e\u003cvalue name\u003d"times"\u003e\u003cshadow type\u003d"math_number" id\u003d")94^i_Dgg/\u003dup~Na^asY"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e5\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cstatement name\u003d"DO"\u003e\u003cblock type\u003d"self_change_effect_2" id\u003d"4n12R+w7Q2J(@wPyAaUH" inline\u003d"true"\u003e\u003cfield name\u003d"scope"\u003e1\u003c/field\u003e\u003cvalue name\u003d"steps"\u003e\u003cshadow type\u003d"math_number" id\u003d"2TUtanpTgl+T#hkn:0vO"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e-15\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003c/block\u003e\u003c/statement\u003e\u003cnext\u003e\u003cblock type\u003d"repeat_n_times" id\u003d"Oxz;xB+#WUpZeouoS{Ga" inline\u003d"true"\u003e\u003cvalue name\u003d"times"\u003e\u003cshadow type\u003d"math_number" id\u003d"viqjM_+hRz,vajjYa]`!"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e5\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cstatement name\u003d"DO"\u003e\u003cblock type\u003d"self_change_effect_2" id\u003d"cc+8MO4B~h6Kz@OnVm:!" inline\u003d"true"\u003e\u003cfield name\u003d"scope"\u003e1\u003c/field\u003e\u003cvalue name\u003d"steps"\u003e\u003cshadow type\u003d"math_number" id\u003d"owtIIO7,`Y.0b$aCSHgz"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e20\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003c/block\u003e\u003c/statement\u003e\u003cnext\u003e\u003cblock type\u003d"repeat_n_times" id\u003d"Bk$k1tF]weua-f#u/u;C" inline\u003d"true"\u003e\u003cvalue name\u003d"times"\u003e\u003cshadow type\u003d"math_number" id\u003d"{rjceh1L$E2#xZTifZg3"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e5\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cstatement name\u003d"DO"\u003e\u003cblock type\u003d"self_change_effect_2" id\u003d"GjJ;4D!;dgYNP`Z5djvQ" inline\u003d"true"\u003e\u003cfield name\u003d"scope"\u003e1\u003c/field\u003e\u003cvalue name\u003d"steps"\u003e\u003cshadow type\u003d"math_number" id\u003d"i`)#0TLx;o;)*8Zvr(54"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e-20\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003c/block\u003e\u003c/statement\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003c/statement\u003e\u003c/block\u003e',
          current_style_id: '246a4f80-845f-48b3-a048-c523a584bc31',
          hidden_in_edit: false,
          id: '850025f4-c3f4-4cda-8e17-191b5feb521f',
          locked: false,
          name: '探照灯',
          rotation: -0.0,
          scale: 100.0,
          styles: ['246a4f80-845f-48b3-a048-c523a584bc31'],
          visible: true,
          x: -4.0,
          y: -290.0,
        },
        'ccad1de9-0d75-45e1-8667-90d48e31ca87': {
          blocksXML:
            '\u003cblock type\u003d"on_phone_shake" id\u003d"rhV#,4mKh,BtNrGM5IEi" visible\u003d"visible" inline\u003d"true" x\u003d"65" y\u003d"134"\u003e\u003cnext\u003e\u003cblock type\u003d"self_move_to" id\u003d"a[|^1B:fX6([u@Xw7SX?" visible\u003d"visible" inline\u003d"true"\u003e\u003cvalue name\u003d"x"\u003e\u003cshadow type\u003d"math_number" id\u003d"(O{)`630~w-eM9TL}Z{k" visible\u003d"visible"\u003e\u003cfield constraints\u003d"-Infinity,Infinity,0," name\u003d"NUM"\u003e-28\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d"y"\u003e\u003cshadow type\u003d"math_number" id\u003d"09[Yvvl]Ujh~UC@qOH]F" visible\u003d"visible"\u003e\u003cfield constraints\u003d"-Infinity,Infinity,0," name\u003d"NUM"\u003e188\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cnext\u003e\u003cblock type\u003d"repeat_n_times" id\u003d"wcVT\u003d{sZ\u003dR`-`JQs,2GH" visible\u003d"visible" inline\u003d"true"\u003e\u003cvalue name\u003d"times"\u003e\u003cshadow type\u003d"math_number" id\u003d"A_`YX;JKqK~M7k0zy]L5" visible\u003d"visible"\u003e\u003cfield constraints\u003d"-Infinity,Infinity,0," name\u003d"NUM"\u003e2\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cstatement name\u003d"DO"\u003e\u003cblock type\u003d"self_glide_to" id\u003d"k-gW8icsHIw[*}n1X3Sg" visible\u003d"visible" inline\u003d"true"\u003e\u003cvalue name\u003d"time"\u003e\u003cshadow type\u003d"math_number" id\u003d":R(3i2O:gMRd~)b7T29." visible\u003d"visible"\u003e\u003cfield constraints\u003d"-Infinity,Infinity,0," name\u003d"NUM"\u003e0.2\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d"x"\u003e\u003cshadow type\u003d"math_number" id\u003d"NOjw?5-R1!T91:mN?5])" visible\u003d"visible"\u003e\u003cfield constraints\u003d"-Infinity,Infinity,0," name\u003d"NUM"\u003e-8\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d"y"\u003e\u003cshadow type\u003d"math_number" id\u003d"(/9I4CojG{9)WAnNDjfM" visible\u003d"visible"\u003e\u003cfield constraints\u003d"-Infinity,Infinity,0," name\u003d"NUM"\u003e208\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cnext\u003e\u003cblock type\u003d"self_glide_to" id\u003d"KiP[m`^}nNE+`q:LoKvP" visible\u003d"visible" inline\u003d"true"\u003e\u003cvalue name\u003d"time"\u003e\u003cshadow type\u003d"math_number" id\u003d"3@a5ZpjhA8[Nha6bbB`d" visible\u003d"visible"\u003e\u003cfield constraints\u003d"-Infinity,Infinity,0," name\u003d"NUM"\u003e0.15\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d"x"\u003e\u003cshadow type\u003d"math_number" id\u003d"_l][B2dA9PYgYDrp.Eg/" visible\u003d"visible"\u003e\u003cfield constraints\u003d"-Infinity,Infinity,0," name\u003d"NUM"\u003e0\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d"y"\u003e\u003cshadow type\u003d"math_number" id\u003d"Dh#1hO$3)80zAb6NU(kq" visible\u003d"visible"\u003e\u003cfield constraints\u003d"-Infinity,Infinity,0," name\u003d"NUM"\u003e184\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cnext\u003e\u003cblock type\u003d"self_glide_to" id\u003d"wS5NttKN5TXZevCg#[JT" visible\u003d"visible" inline\u003d"true"\u003e\u003cvalue name\u003d"time"\u003e\u003cshadow type\u003d"math_number" id\u003d"r_+\u003dRtScs2WUO0q@~H:U" visible\u003d"visible"\u003e\u003cfield constraints\u003d"-Infinity,Infinity,0," name\u003d"NUM"\u003e0.1\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d"x"\u003e\u003cshadow type\u003d"math_number" id\u003d"(HZ;dW{/-.cN:1I0qOI_" visible\u003d"visible"\u003e\u003cfield constraints\u003d"-Infinity,Infinity,0," name\u003d"NUM"\u003e-28\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d"y"\u003e\u003cshadow type\u003d"math_number" id\u003d"UQy)CHOjtt;8~PL{E^V^" visible\u003d"visible"\u003e\u003cfield constraints\u003d"-Infinity,Infinity,0," name\u003d"NUM"\u003e188\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003c/statement\u003e\u003cnext last_next_in_stack\u003d"true"\u003e\u003c/next\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e',
          current_style_id: '0c727da1-297b-45e8-9017-5d6e4c6a821a',
          hidden_in_edit: false,
          id: 'ccad1de9-0d75-45e1-8667-90d48e31ca87',
          locked: false,
          name: '积木星球1',
          rotation: -0.0,
          scale: 112.36817206602565,
          styles: [
            '7e562fff-6827-4eaf-92d2-7df0a07ac46c',
            '0dc60d64-a4e9-46a8-b5d0-6f2fb4bcf656',
            '0dd2c41d-e4ad-4e70-a711-aa4cf59c6ad0',
            '1b2cfd4e-97f6-4a05-9671-73a63a0b515b',
            '0c727da1-297b-45e8-9017-5d6e4c6a821a',
            'ba9b4354-eac3-4054-bb69-d6e1a855c495',
            '2fd672b5-6ec7-49f4-9db1-e5577b2fa0da',
          ],
          visible: true,
          x: -28.0,
          y: 188.0,
        },
        'a31bf032-f65c-4df1-8788-8ecd0c94ef5e': {
          blocksXML:
            '\u003cvariables\u003e\u003cvariable type\u003d"" id\u003d"NO|mB@`i$*b__M|V+5na"\u003e?\u003c/variable\u003e\u003c/variables\u003e\u003cblock type\u003d"on_phone_shake" id\u003d"#:l7m{v@NSnWadLP++?m" inline\u003d"true" x\u003d"103" y\u003d"91"\u003e\u003cnext\u003e\u003cblock type\u003d"self_move_to" id\u003d"04Ff^o42{N.Gc3MxoyHC" inline\u003d"true"\u003e\u003cvalue name\u003d"x"\u003e\u003cshadow type\u003d"math_number" id\u003d"ObrGkYZ1,8B8^:zpJ]@U"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e67\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d"y"\u003e\u003cshadow type\u003d"math_number" id\u003d"-pS@5ML:sdzKIprD9}2z"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e171\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cnext\u003e\u003cblock type\u003d"repeat_n_times" id\u003d"f|rIHIC8aT~5]*MXUm7w" inline\u003d"true"\u003e\u003cvalue name\u003d"times"\u003e\u003cshadow type\u003d"math_number" id\u003d":kczj5@82AXSai?huLO_"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e2\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cstatement name\u003d"DO"\u003e\u003cblock type\u003d"self_glide_to" id\u003d"\u003d\u003dONwPs3C9M@j_j/Obhc" inline\u003d"true"\u003e\u003cvalue name\u003d"time"\u003e\u003cshadow type\u003d"math_number" id\u003d"Q1!o1Op_],6yzuj25C8E"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e0.1\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d"x"\u003e\u003cshadow type\u003d"math_number" id\u003d"mMOsF-RR:E(nZ?FFlt!/"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e60\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d"y"\u003e\u003cshadow type\u003d"math_number" id\u003d"kn~|?!7\u003dmp6dt88uFqv:"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e188\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cnext\u003e\u003cblock type\u003d"self_glide_to" id\u003d"8Q5|yNp$U$|Z^xQEm.SH" inline\u003d"true"\u003e\u003cvalue name\u003d"time"\u003e\u003cshadow type\u003d"math_number" id\u003d"Kr(~9~YKO#A3;.dEz2u1"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e0.15\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d"x"\u003e\u003cshadow type\u003d"math_number" id\u003d":LAJQ~?E}#^vw[;49eE("\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e50\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d"y"\u003e\u003cshadow type\u003d"math_number" id\u003d"tLAh+_GbZTyIpx1wTwpE"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e160\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cnext\u003e\u003cblock type\u003d"self_glide_to" id\u003d"277,s2i2Z]n$ob9e[U+x" inline\u003d"true"\u003e\u003cvalue name\u003d"time"\u003e\u003cshadow type\u003d"math_number" id\u003d"8A?,f.}aGDQDJ(/XS5N3"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e0.2\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d"x"\u003e\u003cshadow type\u003d"math_number" id\u003d"o+_*(X_5i{Y!@o$Vxyhr"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e67\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d"y"\u003e\u003cshadow type\u003d"math_number" id\u003d"U;n]cx.KZxkdR#j^z8O|"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e171\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003c/statement\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e',
          current_style_id: '5a3ecaa9-8064-472c-b822-09756acfe108',
          hidden_in_edit: false,
          id: 'a31bf032-f65c-4df1-8788-8ecd0c94ef5e',
          locked: false,
          name: '积木星球2',
          rotation: -0.0,
          scale: 66.0501560789297,
          styles: [
            'fdbcb8cd-adaa-4b50-96bf-bc0522971e13',
            'fed1cea4-0a2b-48fe-904a-c758ab9a3adf',
            'e695dd9e-fda0-4697-9f76-76ee10bf4fd3',
            '4fab05b5-98f4-4c37-9f83-9ee72587fc72',
            '0f1fa37c-f3e3-4d6d-bf53-bd88175e1c13',
            '9fbda9aa-18ff-4aa3-b4f7-d8e6079a0578',
            '5a3ecaa9-8064-472c-b822-09756acfe108',
          ],
          visible: true,
          x: 60.0,
          y: 167.0,
        },
        '5e7673c5-442c-45ee-a6fc-7118eb4e3ab8': {
          blocksXML:
            '\u003cvariables\u003e\u003cvariable type\u003d"" id\u003d"!+qtpuD1{??qp#JJTYp@"\u003e?\u003c/variable\u003e\u003c/variables\u003e\u003cblock type\u003d"on_phone_shake" id\u003d"$2Q1VuHjgYUO-:tTgGDn" inline\u003d"true" x\u003d"107" y\u003d"154"\u003e\u003cnext\u003e\u003cblock type\u003d"self_move_to" id\u003d"mp;F28f1+)P;P[VGC\u003d`9" inline\u003d"true"\u003e\u003cvalue name\u003d"x"\u003e\u003cshadow type\u003d"math_number" id\u003d"h(]Zw3c698u7z0ZBj+*p"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e28\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d"y"\u003e\u003cshadow type\u003d"math_number" id\u003d"pM@J#/qmBJLD,uXJzLTv"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e86\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cnext\u003e\u003cblock type\u003d"repeat_n_times" id\u003d"kgHb\u003d?$Tw}UokU`x?.Qe" inline\u003d"true"\u003e\u003cvalue name\u003d"times"\u003e\u003cshadow type\u003d"math_number" id\u003d"$qoJ0/b_g[O43zG]}`/g"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e2\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cstatement name\u003d"DO"\u003e\u003cblock type\u003d"self_glide_to" id\u003d"pH~q[kvmy*J[iMG^-[~k" inline\u003d"true"\u003e\u003cvalue name\u003d"time"\u003e\u003cshadow type\u003d"math_number" id\u003d"]DY83[NbdIQ{H--EW$LE"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e0.15\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d"x"\u003e\u003cshadow type\u003d"math_number" id\u003d"SLdBO[Stg63EKkOp!00n"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e48\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d"y"\u003e\u003cshadow type\u003d"math_number" id\u003d"!P}c8qYCeRux\u003deC)1`qH"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e116\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cnext\u003e\u003cblock type\u003d"self_glide_to" id\u003d"pSLk5YYFNNtPa\u003d6K)1F3" inline\u003d"true"\u003e\u003cvalue name\u003d"time"\u003e\u003cshadow type\u003d"math_number" id\u003d"[b](qL#W64i,.?{RMkZ`"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e0.15\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d"x"\u003e\u003cshadow type\u003d"math_number" id\u003d"LcNY`7}+;62R^b$m`M,c"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e32\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d"y"\u003e\u003cshadow type\u003d"math_number" id\u003d"(D8c:+yDj4ny~9sxPV6a"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e100\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cnext\u003e\u003cblock type\u003d"self_glide_to" id\u003d"@mw^SXHQ7AWKPMLHLrk*" inline\u003d"true"\u003e\u003cvalue name\u003d"time"\u003e\u003cshadow type\u003d"math_number" id\u003d"TcVt/,{?{yYQxfPy#yO`"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e0.15\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d"x"\u003e\u003cshadow type\u003d"math_number" id\u003d"8)9LWm^O4jvm\u003dbol^g}R"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e28\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d"y"\u003e\u003cshadow type\u003d"math_number" id\u003d"UV[V,gQTZ.tvij5}]IZF"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e86\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003c/statement\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e',
          current_style_id: 'e9c6e5f0-998d-4fe9-9061-407347d36f9a',
          hidden_in_edit: false,
          id: '5e7673c5-442c-45ee-a6fc-7118eb4e3ab8',
          locked: false,
          name: '积木星球3',
          rotation: -0.0,
          scale: 83.58164354601165,
          styles: [
            'a6e3371d-0889-4cd8-b872-a899a10d756c',
            '6f664630-6f12-4890-a66e-9f45daf1d6af',
            '52349194-0735-4110-8553-fd744412e7e8',
            'e9c6e5f0-998d-4fe9-9061-407347d36f9a',
            'cbaab030-2657-4b74-b118-b0e6457f1f00',
            'e444d002-ff67-4662-80d0-0ab2c7acfd4e',
            'a81e8c9d-95e6-4caa-aa89-0d60aa2b8c6b',
          ],
          visible: true,
          x: 26.0,
          y: 86.0,
        },
        'c90c29f7-d643-479e-9459-431185123569': {
          blocksXML:
            '\u003cvariables\u003e\u003cvariable type\u003d"" id\u003d"VB{^[X0w?iqSdOy:r^uz"\u003e?\u003c/variable\u003e\u003c/variables\u003e\u003cblock type\u003d"on_phone_shake" id\u003d"mKa_gMgIflh6(0:W;Qg_" inline\u003d"true" x\u003d"106" y\u003d"83"\u003e\u003cnext\u003e\u003cblock type\u003d"self_move_to" id\u003d"VPWn$K$pDfcR@J:2Ml0y" inline\u003d"true"\u003e\u003cvalue name\u003d"x"\u003e\u003cshadow type\u003d"math_number" id\u003d"`7z0pE,s@?G@6lyuUcw0"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e-72\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d"y"\u003e\u003cshadow type\u003d"math_number" id\u003d"-|3#iTFLU~8]7v|BTF8f"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e89\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cnext\u003e\u003cblock type\u003d"repeat_n_times" id\u003d"cDzvwfj`4/@N7o:12wc4" inline\u003d"true"\u003e\u003cvalue name\u003d"times"\u003e\u003cshadow type\u003d"math_number" id\u003d"g^.i|F~N@plPv-J!6?DT"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e2\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cstatement name\u003d"DO"\u003e\u003cblock type\u003d"self_glide_to" id\u003d"OwfmZ)aB@Dgepo-;LSL|" inline\u003d"true"\u003e\u003cvalue name\u003d"time"\u003e\u003cshadow type\u003d"math_number" id\u003d"YQyNQ*R2QZ\u003d@t[7Jr*ii"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e0.15\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d"x"\u003e\u003cshadow type\u003d"math_number" id\u003d"-QaGP#q$ZBBbxh4y4vPB"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e-30\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d"y"\u003e\u003cshadow type\u003d"math_number" id\u003d"g(@S+dud[X1{Da;z]`S,"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e100\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cnext\u003e\u003cblock type\u003d"self_glide_to" id\u003d"-22.V5}T9-het.L)rBkZ" inline\u003d"true"\u003e\u003cvalue name\u003d"time"\u003e\u003cshadow type\u003d"math_number" id\u003d"/Mm*:T,PVbKy;[AC08fN"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e0.15\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d"x"\u003e\u003cshadow type\u003d"math_number" id\u003d"`Jzt$7E_hUzyVd`lC:Xq"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e-50\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d"y"\u003e\u003cshadow type\u003d"math_number" id\u003d",7{zOVD`EUjvI`fwcf{("\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e70\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cnext\u003e\u003cblock type\u003d"self_glide_to" id\u003d"pPl`syFRC|!]Tbj^lPBI" inline\u003d"true"\u003e\u003cvalue name\u003d"time"\u003e\u003cshadow type\u003d"math_number" id\u003d"SVW}k@2kRf;rtc-u4\u003du;"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e0.15\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d"x"\u003e\u003cshadow type\u003d"math_number" id\u003d"}W[9)#|*sCY~i|]9-Ds#"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e-72\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003cvalue name\u003d"y"\u003e\u003cshadow type\u003d"math_number" id\u003d"Jrk#E@\u003dyA4U@/F{4N(uu"\u003e\u003cfield name\u003d"NUM" constraints\u003d"-Infinity,Infinity,0"\u003e89\u003c/field\u003e\u003c/shadow\u003e\u003c/value\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003c/statement\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e\u003c/next\u003e\u003c/block\u003e',
          current_style_id: 'b9e9d0f5-8996-45e2-a327-031b0897867c',
          hidden_in_edit: false,
          id: 'c90c29f7-d643-479e-9459-431185123569',
          locked: false,
          name: '积木星球4',
          rotation: -0.0,
          scale: 64.16007104643224,
          styles: [
            '34e34f21-a573-4076-92b9-87cce8b88fa7',
            'e5d8e6a0-8d88-4c42-a031-ea1478e234fc',
            'b9e9d0f5-8996-45e2-a327-031b0897867c',
            '1a06d2ae-9fcd-40ae-b4be-0d1096fa76af',
            '545ff3e8-b7dc-4e00-b3b1-0b6d7b181e34',
            '5670ae82-c70b-450a-8dbd-ff555a9a15f9',
            'b6372927-d092-4b7e-b753-af7c5c4623a4',
          ],
          visible: true,
          x: -72.0,
          y: 89.0,
        },
      },
      current_actor: '0a67a969-430b-4f03-b35a-a91ef4c917b9',
    },
    extensions: [],
    app_version: '1.3.0',
    audios: {
      sounds: {},
    },
    block_count: {
      all_block_count: 83,
      visible_block_count: 83,
    },
    broadcast: {
      broadcast_dict: {
        '94fa763a-519f-4c92-bd5f-939e2bca70a1': {
          id: '94fa763a-519f-4c92-bd5f-939e2bca70a1',
          name: '摇晃',
          scene: '700824a5-44a8-4d03-a7e8-aa95d87e9b2a',
        },
        '5cd7cbc1-805d-4413-af31-188ca6a3c3b8': {
          id: '5cd7cbc1-805d-4413-af31-188ca6a3c3b8',
          name: '摇晃完毕',
          scene: '700824a5-44a8-4d03-a7e8-aa95d87e9b2a',
        },
      },
    },
    procedures: {
      procedure_dict: {},
    },
    project_name: '摇一摇大黄鸡.bcm',
    scenes: {
      current_scene: '700824a5-44a8-4d03-a7e8-aa95d87e9b2a',
      scenes_dict: {
        '700824a5-44a8-4d03-a7e8-aa95d87e9b2a': {
          actors: [
            '850025f4-c3f4-4cda-8e17-191b5feb521f',
            'af434f04-17b3-4215-a8fd-7a090f34da6e',
            '0a67a969-430b-4f03-b35a-a91ef4c917b9',
            'c90c29f7-d643-479e-9459-431185123569',
            '5e7673c5-442c-45ee-a6fc-7118eb4e3ab8',
            'a31bf032-f65c-4df1-8788-8ecd0c94ef5e',
            'ccad1de9-0d75-45e1-8667-90d48e31ca87',
          ],
          blocksXML:
            '\u003cvariables\u003e\u003cvariable type\u003d"" id\u003d"5ZCjqB*)s:;oCyRK-ghp"\u003e?\u003c/variable\u003e\u003c/variables\u003e',
          current_style_id: 'b41fe7a9-5a3a-42d9-b150-4f55a1261be9',
          id: '700824a5-44a8-4d03-a7e8-aa95d87e9b2a',
          name: '背景',
          styles: ['623b814d-52e2-4971-8dca-7586d2a385c2', 'b41fe7a9-5a3a-42d9-b150-4f55a1261be9'],
          visible: true,
        },
      },
      scenes_order: ['700824a5-44a8-4d03-a7e8-aa95d87e9b2a'],
    },
    split_options: {
      options_dict: {},
    },
    styles: {
      styles_dict: {
        '623b814d-52e2-4971-8dca-7586d2a385c2': {
          id: '623b814d-52e2-4971-8dca-7586d2a385c2',
          name: '背景',
          texture: 'res/drawable/default_empty_background.png',
        },
        'b41fe7a9-5a3a-42d9-b150-4f55a1261be9': {
          id: 'b41fe7a9-5a3a-42d9-b150-4f55a1261be9',
          name: '湛蓝宇宙',
          texture: 'res/drawable/b_135.jpg',
        },
        '10b9c4b1-bf08-42f1-942c-d3a7b0cb9e16': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: '10b9c4b1-bf08-42f1-942c-d3a7b0cb9e16',
          name: '大黄鸡扭蛋机',
          texture: 'res/drawable/a_1240.png',
        },
        'a83eccae-0233-423a-a8f0-1abf0c1011fd': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: 'a83eccae-0233-423a-a8f0-1abf0c1011fd',
          name: '积木星球',
          texture: 'res/drawable/a_3149_1.png',
        },
        '72760ecb-9590-45d0-9e9f-d42c3babf8e8': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: '72760ecb-9590-45d0-9e9f-d42c3babf8e8',
          name: '积木星球',
          texture: 'res/drawable/a_3149_2.png',
        },
        'd867480b-44ce-472f-80cb-4538ac827d65': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: 'd867480b-44ce-472f-80cb-4538ac827d65',
          name: '积木星球',
          texture: 'res/drawable/a_3149_3.png',
        },
        '55bbbeeb-f091-4eca-a031-7eca81a375fc': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: '55bbbeeb-f091-4eca-a031-7eca81a375fc',
          name: '积木星球',
          texture: 'res/drawable/a_3149_4.png',
        },
        '6e2df355-719a-409c-b814-62d12e190cde': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: '6e2df355-719a-409c-b814-62d12e190cde',
          name: '积木星球',
          texture: 'res/drawable/a_3149_5.png',
        },
        '83a0bb66-147b-4ca0-abb3-037e94a5b14d': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: '83a0bb66-147b-4ca0-abb3-037e94a5b14d',
          name: '积木星球',
          texture: 'res/drawable/a_3149_6.png',
        },
        '6ce3e778-37d7-4b64-b298-291e73f34855': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: '6ce3e778-37d7-4b64-b298-291e73f34855',
          name: '积木星球',
          texture: 'res/drawable/a_3149_7.png',
        },
        '246a4f80-845f-48b3-a048-c523a584bc31': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: '246a4f80-845f-48b3-a048-c523a584bc31',
          name: '探照灯',
          texture: 'res/drawable/a_3150.png',
        },
        '7e562fff-6827-4eaf-92d2-7df0a07ac46c': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: '7e562fff-6827-4eaf-92d2-7df0a07ac46c',
          name: '积木星球1',
          texture: 'res/drawable/a_3149_1.png',
        },
        '0dc60d64-a4e9-46a8-b5d0-6f2fb4bcf656': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: '0dc60d64-a4e9-46a8-b5d0-6f2fb4bcf656',
          name: '积木星球1',
          texture: 'res/drawable/a_3149_2.png',
        },
        '0dd2c41d-e4ad-4e70-a711-aa4cf59c6ad0': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: '0dd2c41d-e4ad-4e70-a711-aa4cf59c6ad0',
          name: '积木星球1',
          texture: 'res/drawable/a_3149_3.png',
        },
        '1b2cfd4e-97f6-4a05-9671-73a63a0b515b': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: '1b2cfd4e-97f6-4a05-9671-73a63a0b515b',
          name: '积木星球1',
          texture: 'res/drawable/a_3149_4.png',
        },
        '0c727da1-297b-45e8-9017-5d6e4c6a821a': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: '0c727da1-297b-45e8-9017-5d6e4c6a821a',
          name: '积木星球1',
          texture: 'res/drawable/a_3149_5.png',
        },
        'ba9b4354-eac3-4054-bb69-d6e1a855c495': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: 'ba9b4354-eac3-4054-bb69-d6e1a855c495',
          name: '积木星球1',
          texture: 'res/drawable/a_3149_6.png',
        },
        '2fd672b5-6ec7-49f4-9db1-e5577b2fa0da': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: '2fd672b5-6ec7-49f4-9db1-e5577b2fa0da',
          name: '积木星球1',
          texture: 'res/drawable/a_3149_7.png',
        },
        'fdbcb8cd-adaa-4b50-96bf-bc0522971e13': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: 'fdbcb8cd-adaa-4b50-96bf-bc0522971e13',
          name: '积木星球2',
          texture: 'res/drawable/a_3149_1.png',
        },
        'fed1cea4-0a2b-48fe-904a-c758ab9a3adf': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: 'fed1cea4-0a2b-48fe-904a-c758ab9a3adf',
          name: '积木星球2',
          texture: 'res/drawable/a_3149_2.png',
        },
        'e695dd9e-fda0-4697-9f76-76ee10bf4fd3': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: 'e695dd9e-fda0-4697-9f76-76ee10bf4fd3',
          name: '积木星球2',
          texture: 'res/drawable/a_3149_3.png',
        },
        '4fab05b5-98f4-4c37-9f83-9ee72587fc72': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: '4fab05b5-98f4-4c37-9f83-9ee72587fc72',
          name: '积木星球2',
          texture: 'res/drawable/a_3149_4.png',
        },
        '0f1fa37c-f3e3-4d6d-bf53-bd88175e1c13': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: '0f1fa37c-f3e3-4d6d-bf53-bd88175e1c13',
          name: '积木星球2',
          texture: 'res/drawable/a_3149_5.png',
        },
        '9fbda9aa-18ff-4aa3-b4f7-d8e6079a0578': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: '9fbda9aa-18ff-4aa3-b4f7-d8e6079a0578',
          name: '积木星球2',
          texture: 'res/drawable/a_3149_6.png',
        },
        '5a3ecaa9-8064-472c-b822-09756acfe108': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: '5a3ecaa9-8064-472c-b822-09756acfe108',
          name: '积木星球2',
          texture: 'res/drawable/a_3149_7.png',
        },
        'a6e3371d-0889-4cd8-b872-a899a10d756c': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: 'a6e3371d-0889-4cd8-b872-a899a10d756c',
          name: '积木星球3',
          texture: 'res/drawable/a_3149_1.png',
        },
        '6f664630-6f12-4890-a66e-9f45daf1d6af': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: '6f664630-6f12-4890-a66e-9f45daf1d6af',
          name: '积木星球3',
          texture: 'res/drawable/a_3149_2.png',
        },
        '52349194-0735-4110-8553-fd744412e7e8': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: '52349194-0735-4110-8553-fd744412e7e8',
          name: '积木星球3',
          texture: 'res/drawable/a_3149_3.png',
        },
        'e9c6e5f0-998d-4fe9-9061-407347d36f9a': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: 'e9c6e5f0-998d-4fe9-9061-407347d36f9a',
          name: '积木星球3',
          texture: 'res/drawable/a_3149_4.png',
        },
        'cbaab030-2657-4b74-b118-b0e6457f1f00': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: 'cbaab030-2657-4b74-b118-b0e6457f1f00',
          name: '积木星球3',
          texture: 'res/drawable/a_3149_5.png',
        },
        'e444d002-ff67-4662-80d0-0ab2c7acfd4e': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: 'e444d002-ff67-4662-80d0-0ab2c7acfd4e',
          name: '积木星球3',
          texture: 'res/drawable/a_3149_6.png',
        },
        'a81e8c9d-95e6-4caa-aa89-0d60aa2b8c6b': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: 'a81e8c9d-95e6-4caa-aa89-0d60aa2b8c6b',
          name: '积木星球3',
          texture: 'res/drawable/a_3149_7.png',
        },
        '34e34f21-a573-4076-92b9-87cce8b88fa7': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: '34e34f21-a573-4076-92b9-87cce8b88fa7',
          name: '积木星球4',
          texture: 'res/drawable/a_3149_1.png',
        },
        'e5d8e6a0-8d88-4c42-a031-ea1478e234fc': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: 'e5d8e6a0-8d88-4c42-a031-ea1478e234fc',
          name: '积木星球4',
          texture: 'res/drawable/a_3149_2.png',
        },
        'b9e9d0f5-8996-45e2-a327-031b0897867c': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: 'b9e9d0f5-8996-45e2-a327-031b0897867c',
          name: '积木星球4',
          texture: 'res/drawable/a_3149_3.png',
        },
        '1a06d2ae-9fcd-40ae-b4be-0d1096fa76af': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: '1a06d2ae-9fcd-40ae-b4be-0d1096fa76af',
          name: '积木星球4',
          texture: 'res/drawable/a_3149_4.png',
        },
        '545ff3e8-b7dc-4e00-b3b1-0b6d7b181e34': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: '545ff3e8-b7dc-4e00-b3b1-0b6d7b181e34',
          name: '积木星球4',
          texture: 'res/drawable/a_3149_5.png',
        },
        '5670ae82-c70b-450a-8dbd-ff555a9a15f9': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: '5670ae82-c70b-450a-8dbd-ff555a9a15f9',
          name: '积木星球4',
          texture: 'res/drawable/a_3149_6.png',
        },
        'b6372927-d092-4b7e-b753-af7c5c4623a4': {
          center_point: {
            x: 0.0,
            y: 0.0,
          },
          id: 'b6372927-d092-4b7e-b753-af7c5c4623a4',
          name: '积木星球4',
          texture: 'res/drawable/a_3149_7.png',
        },
      },
    },
    toolbox: {
      devices: [] as any[],
    },
    variable: {
      variable_dict: {
        '56d58ca6-703b-40a3-b88c-5e90b229c1b4': {
          create_time: 0,
          id: '56d58ca6-703b-40a3-b88c-5e90b229c1b4',
          is_global: true,
          name: '积木类型',
          offset: {
            x: 0.0,
            y: 0.0,
          },
          position: {
            x: -281.0,
            y: 450.0,
          },
          scale: 0.35,
          theme: 'common',
          type: 'any',
          value: 0.0,
          visible: false,
        },
        kdDEVdg9: {
          create_time: 1771383389,
          id: 'kdDEVdg9',
          is_global: true,
          name: 'fhh',
          offset: {
            x: 0.0,
            y: 0.0,
          },
          position: {
            x: -271.0,
            y: 376.0,
          },
          scale: 1.0,
          theme: 'common',
          type: 'private',
          value: 0.0,
          visible: true,
        },
      },
    },
  })
  const bcmJson = ref(defaultBCMJson.value)
  const currentActor = ref('')
  const actorList = ref<any>([])
  const isLoading = ref(true)
  const workId = ref(0)
  const workLoadingProgress = ref(0)
  const workExtensions = ref([
    {
      name: '[快速配置]FastSet',
      version: '1.2.0',
      url: 'https://raw.giteeusercontent.com/SandMo/BetterNemo-Extensions/raw/master/Extensions/%E6%95%B0%E6%8D%AE%E5%A4%84%E7%90%86%E7%B1%BB/%5B%E5%BF%AB%E9%80%9F%E9%85%8D%E7%BD%AE%5DFastSet/1.2.0/',
    },
  ])
  async function goWork(workJson: any, reload?: boolean, newWorkID?: number) {
    try {
      isLoading.value = true
      workLoadingProgress.value = 10
      if (!domStore.iframeRef || !domStore.iframeRef.contentWindow) {
        return
      }

      // 获取用户信息
      if (!authStore.notLogin) {
        try {
          const data = await authStore.getUserData()
          if (!data.success) {
            console.log(`无法加载账号信息`)
            return
          }
        } catch (e) {
          console.log(`登录账号出现问题:${e}`)
          return
        }
      }
      workLoadingProgress.value = 30

      if (reload) {
        domStore.iframeRef.contentWindow.location.reload()
      }
      bcmJson.value = workJson
      console.log(workJson.project_name)
      console.log(bcmJson.value.project_name)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      clearBridgeInstance()
      setBridgeInstance(new BNWorkspaceBridge({ value: domStore.iframeRef }))
      const bridgeInstance = getBridgeInstance()
      if (!bridgeInstance) {
        return
      }

      // 初始化bridge实例
      bridgeInstance.registerListener()
      bridgeInstance.onMessage = (message: any) => {
        if (!message?.args) {
          return
        }
        let data_arg: any = {}
        if (Object.prototype.toString.call(message?.args[1]) != '[object Object]') {
          data_arg = JSON.parse(message?.args[1])
        } else {
          data_arg = message?.args[1]
        }
        if (!data_arg?.data) {
          return
        }
        const data_object = JSON.parse(data_arg?.data)
        switch (data_object?.type) {
          case 'SHOW_TOAST':
            snackbar({
              message: data_object?.payload?.text,
              closeable: true,
            })
        }
      }

      if (!isLoading.value) {
        console.log('作品已加载,不重复加载')
        return
      }

      if (newWorkID) {
        workId.value = newWorkID
      }
      actorList.value = []
      // 解析bcmJson.value
      Object.entries(bcmJson.value.actors.actors_dict).forEach(([_, value]) => {
        actorList.value.push(value)
      })
      currentActor.value = bcmJson.value.actors.current_actor

      // 初始化数据
      console.log('BN iframe 加载完成')
      workLoadingProgress.value = 60

      // 设置用户数据
      bridgeInstance.initWebviewData(
        String(authStore.userData.userInfo.user.id),
        String(newWorkID ?? workId.value),
        authStore.userData.userInfo.user.nickname,
        isPad.value,
        authStore.userData.userInfo.user.avatar,
      )
      workLoadingProgress.value = 90
      const pureBcmJson = JSON.parse(JSON.stringify(workJson))
      bridgeInstance.sendBridgeMessage('_dsaf.postMessageAsyn', ['LOAD_BCM', pureBcmJson])
      workLoadingProgress.value = 100
      setTimeout(() => {
        isLoading.value = false
      }, 500)
    } catch (error) {
      console.error('加载iframe失败:', error)
    }
  }
  function newWork(reload?: boolean) {
    if (!domStore.iframeRef || !domStore.iframeRef.contentWindow) {
      return
    }
    goWork(JSON.parse(JSON.stringify(defaultBCMJson.value)), reload)
  }
  async function syncWork() {
    if (!domStore.iframeRef) {
      return
    }
    const iframeWin: any = domStore.iframeRef.contentWindow
    if (!iframeWin || !iframeWin._dsaf) {
      console.error('iframe未加载完成或不同域')
      return
    }
    let blocksInfo = {}
    let workResult: SaveDataResult = {
      xml: { '': '' },
      block_count: 0,
      block_count_visible_only: 0,
      variable_dict: {},
      broadcast_dict: {},
      split_options: {},
      procedure_dict: {},
      toolbox: {
        devices: [],
      },
    }
    const result: SaveDataResult = await new Promise((resolve) => {
      iframeWin._dsaf.postMessageAsyn('REQUEST_ALL_SAVE_DATA', {}, resolve)
    })

    const extensions = iframeWin.extensionMetaData

    workResult = result
    blocksInfo = result.xml
    const actors_dict = bcmJson.value.actors.actors_dict
    const scenes_dict = bcmJson.value.scenes.scenes_dict
    for (const blockName of Object.keys(blocksInfo)) {
      if (Object.keys(actors_dict).includes(blockName)) {
        actors_dict[blockName as keyof typeof actors_dict].blocksXML =
          blocksInfo[blockName as keyof typeof blocksInfo]
      } else if (Object.keys(scenes_dict).includes(blockName)) {
        scenes_dict[blockName as keyof typeof scenes_dict].blocksXML =
          blocksInfo[blockName as keyof typeof blocksInfo]
      }
    }
    console.log(workResult)
    bcmJson.value.block_count.all_block_count = workResult.block_count
    bcmJson.value.block_count.visible_block_count = workResult.block_count_visible_only
    bcmJson.value.toolbox = workResult.toolbox
    bcmJson.value.variable.variable_dict = workResult.variable_dict as any
    bcmJson.value.broadcast.broadcast_dict = workResult.broadcast_dict as any
    bcmJson.value.procedures.procedure_dict = workResult.procedure_dict as any
    bcmJson.value.split_options.options_dict = workResult.split_options as any
    bcmJson.value.extensions = []
    for (const extension of extensions) {
      ;(bcmJson.value.extensions as Array<any>).push({
        name: extension?.fileName,
        version: extension?.version,
        url: extension?.url,
      })
    }
  }
  return {
    newWork,
    isPlay,
    bcmJson,
    defaultBCMJson,
    goWork,
    currentActor,
    actorList,
    isPad,
    syncWork,
    workLoadingProgress,
    isLoading,
    workId,
    workExtensions,
    isZipWork,
  }
})
