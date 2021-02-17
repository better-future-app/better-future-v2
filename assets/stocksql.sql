SELECT TOP(100)
    *
from ESGSTOCK
ORDER BY esgrating DESC
-- SELECT TOP(10)* FROM ESGSTOCK Where [group] = 'Automobiles' ORDER by esgrating ASC
-- SELECT *
-- FROM ESGSTOCK
-- Where [name] like 'Advanced Micro Devices Inc'
-- SELECT *
-- FROM ESGSTOCK
-- Where [name] like 'Tesla Inc'
-- SELECT *
-- FROM ESGSTOCK
-- Where [name] like 'Microsoft Corp'
-- SELECT *
-- FROM ESGSTOCK
-- Where [name] like 'Alphabet Inc'
-- SELECT *
-- FROM ESGSTOCK
-- Where [name] like 'NVIDIA Corp.'
-- SELECT *
-- FROM ESGSTOCK
-- Where [name] like 'Beyond Meat, Inc.'
-- SELECT *
-- FROM ESGSTOCK
-- Where [name] like 'QUALCOMM, Inc.'
-- SELECT *
-- FROM ESGSTOCK
-- Where [name] like 'Walt Disney Co'
-- SELECT *
-- FROM ESGSTOCK
-- Where [name] like 'Facebook Inc'
-- SELECT *
-- FROM ESGSTOCK
-- Where [name] like 'Bank of America Corp.' 
-- SELECT TOP(10)* FROM ESGSTOCK Where [group] = 'Software & Services' ORDER by esgrating DESC
-- SELECT COUNT([name]) as industrytotalnumber from ESGSTOCK where [name] like 'HSBC 

-- SELECT ROW_NUMBER() OVER(ORDER BY [name])AS Rank FROM ESGSTOCK  where [name] like 'HSBC Holdings PLC ' 
-- SELECT [Rank] from ESGSTOCK  where [name] like 'HSBC Holdings PLC ' at {SELECT *, RANK()  OVER(ORDER BY [esgrating]) AS Rank
-- FROM ESGSTOCK
-- where [group] = 'Banks' }


-- select RANK
-- from (SELECT ROW_NUMBER() OVER(ORDER BY [esgrating] desc)AS Rank, [name]
--     FROM ESGSTOCK) at
-- where [name] = 'HSBC Holdings PLC'

-- select RANK
-- from (SELECT ROW_NUMBER() OVER(ORDER BY [esgrating] desc)AS Rank), [name]
-- FROM ESGSTOCK) at where [name] = 'HSBC Holdings PLC'
-- select RANK
-- from (SELECT ROW_NUMBER() OVER(ORDER BY [esgrating] desc)AS Rank, [name]
--     FROM ESGSTOCK
--     where [group] = 'Banks') as ranked
-- where ranked.name = 'HSBC Holdings PLC'

-- SELECT COUNT([name]) AS totalrow
-- from ESGSTOCK